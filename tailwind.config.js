/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0D2137', // Deep Navy — headings
          light: '#1A3A5C',
        },
        secondary: {
          DEFAULT: '#1565C0', // Royal Blue
          light: '#1976D2',
        },
        accent: {
          DEFAULT: '#2196F3', // Sky Blue
          glow: 'rgba(33, 150, 243, 0.25)',
        },
        highlight: {
          DEFAULT: '#BBDEFB', // Light Blue tape
        },
        muted: '#374151',      // Dark gray — always readable!
        background: {
          DEFAULT: '#F7FBFF',  // Very light blue-white
        },
        card: {
          DEFAULT: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        tamil: ['Noto Sans Tamil', 'Latha', 'Tamil Sangam MN', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite alternate',
      },
      keyframes: {
        glowPulse: {
          '0%': { opacity: '0.5', transform: 'scale(1)' },
          '100%': { opacity: '0.9', transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
