/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkbg: {
          950: '#070a12',
          900: '#0c101d',
          850: '#111728',
          800: '#182035',
          700: '#222d47',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        teal: {
          400: '#2dd4bf',
          500: '#14b8a6',
        },
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
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
          '0%': { opacity: '0.4', transform: 'scale(1)' },
          '100%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
