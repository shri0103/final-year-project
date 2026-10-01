package com.tamilemotion.service;

import com.tamilemotion.dto.AuthRequest;
import com.tamilemotion.dto.AuthResponse;
import com.tamilemotion.model.User;
import com.tamilemotion.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public AuthResponse login(AuthRequest request) {
        String username = request.getUsername() != null ? request.getUsername().trim() : "";
        String password = request.getPassword() != null ? request.getPassword().trim() : "";

        if (username.isEmpty() || password.isEmpty()) {
            return AuthResponse.error("Username and password are required");
        }

        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(password)) {
                String token = "jwt-" + UUID.randomUUID().toString();
                return AuthResponse.success(token, user.getUsername(), user.getRole(), user.getFullName());
            } else {
                return AuthResponse.error("Invalid credentials. Please verify your password.");
            }
        }

        // Demo fallback: if logging in for demo, create the user or accept default demo
        if ("admin".equalsIgnoreCase(username) || "demo".equalsIgnoreCase(username) || "researcher".equalsIgnoreCase(username)) {
            User newUser = new User(username, username + "@tamilemotion.ai", password, "RESEARCHER", username.toUpperCase() + " AI Lab");
            userRepository.save(newUser);
            String token = "jwt-" + UUID.randomUUID().toString();
            return AuthResponse.success(token, newUser.getUsername(), newUser.getRole(), newUser.getFullName());
        }

        return AuthResponse.error("User '" + username + "' not found. You can register or use admin / admin123");
    }

    public AuthResponse register(AuthRequest request) {
        String username = request.getUsername() != null ? request.getUsername().trim() : "";
        String password = request.getPassword() != null ? request.getPassword().trim() : "";
        String email = request.getEmail() != null ? request.getEmail().trim() : "";

        if (username.isEmpty() || password.isEmpty()) {
            return AuthResponse.error("Username and password are required");
        }

        if (userRepository.existsByUsername(username)) {
            return AuthResponse.error("Username '" + username + "' already exists");
        }

        User user = new User(username, email, password, "RESEARCHER", request.getFullName() != null ? request.getFullName() : username);
        userRepository.save(user);

        String token = "jwt-" + UUID.randomUUID().toString();
        return AuthResponse.success(token, user.getUsername(), user.getRole(), user.getFullName());
    }
}
