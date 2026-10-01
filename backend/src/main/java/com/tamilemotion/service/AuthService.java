package com.tamilemotion.service;

import com.tamilemotion.dto.AuthRequest;
import com.tamilemotion.dto.AuthResponse;
import com.tamilemotion.model.User;
import com.tamilemotion.repository.UserRepository;
import com.tamilemotion.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public AuthResponse login(AuthRequest request) {
        String username = request.getUsername() != null ? request.getUsername().trim() : "";
        String password = request.getPassword() != null ? request.getPassword().trim() : "";

        if (username.isEmpty() || password.isEmpty()) {
            return AuthResponse.error("Username and password are required.");
        }

        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) {
            return AuthResponse.error("Invalid credentials. User '" + username + "' not found.");
        }

        User user = userOpt.get();
        boolean passwordMatches = false;

        // Secure BCrypt comparison with auto-upgrade for legacy records
        if (user.getPassword() != null && (user.getPassword().startsWith("$2a$") || user.getPassword().startsWith("$2b$") || user.getPassword().startsWith("$2y$"))) {
            passwordMatches = passwordEncoder.matches(password, user.getPassword());
        } else if (user.getPassword() != null && user.getPassword().equals(password)) {
            // Upgrade legacy plain-text password to BCrypt hash
            user.setPassword(passwordEncoder.encode(password));
            userRepository.save(user);
            passwordMatches = true;
        }

        if (!passwordMatches) {
            return AuthResponse.error("Invalid credentials. Please verify your password.");
        }

        // Generate cryptographically signed JWT token with claims
        String token = jwtTokenProvider.generateToken(user);
        return AuthResponse.success(token, user.getUsername(), user.getRole(), user.getFullName());
    }

    public AuthResponse register(AuthRequest request) {
        String username = request.getUsername() != null ? request.getUsername().trim() : "";
        String password = request.getPassword() != null ? request.getPassword().trim() : "";
        String email = request.getEmail() != null ? request.getEmail().trim() : "";

        if (username.isEmpty() || password.isEmpty()) {
            return AuthResponse.error("Username and password are required.");
        }

        if (password.length() < 6) {
            return AuthResponse.error("Password must be at least 6 characters long.");
        }

        if (userRepository.existsByUsername(username)) {
            return AuthResponse.error("Username '" + username + "' is already taken.");
        }

        // Hash password with BCrypt before storing in MongoDB
        String hashedPassword = passwordEncoder.encode(password);
        User user = new User(
                username,
                email,
                hashedPassword,
                "RESEARCHER",
                request.getFullName() != null && !request.getFullName().isBlank() ? request.getFullName().trim() : username
        );
        userRepository.save(user);

        // Generate real signed JWT
        String token = jwtTokenProvider.generateToken(user);
        return AuthResponse.success(token, user.getUsername(), user.getRole(), user.getFullName());
    }
}
