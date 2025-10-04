/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Broken Robot Color Palette
        'br-dark': '#0A0E1B',
        'br-gray': '#424242',
        'br-gray-light': '#616161',
        'br-cyan': '#00D4FF',
        'br-cyan-light': '#00BCD4',
        'br-magenta': '#FF00FF',
        'br-magenta-dark': '#E91E63',
        'br-purple': '#9C27B0',
        'br-blue': '#2196F3',
        'br-gold': '#FFD700',
        'br-gold-light': '#FFC107',
        'br-white': '#FFFFFF',

        // Semantic colors
        'bg-primary': '#0A0E1B',
        'bg-secondary': '#1A1F2E',
        'text-primary': '#FFFFFF',
        'text-secondary': '#B0BEC5',
        'accent-primary': '#00D4FF',
        'accent-secondary': '#FF00FF',
        'robot-body': '#424242',
        'robot-eye': '#FFD700',
        'robot-tear': '#00BCD4'
      },
      fontFamily: {
        'cyber': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        'main': ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'glitch': 'glitch 2s infinite',
        'circuit-flow': 'circuit-flow 3s ease-in-out infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite alternate',
        'typing': 'typing 1.5s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'stream-glow': 'stream-glow 1.5s ease-in-out infinite'
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' }
        },
        'circuit-flow': {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 1 }
        },
        'pulse-neon': {
          '0%': {
            boxShadow: '0 0 5px #00D4FF, 0 0 10px #00D4FF, 0 0 15px #00D4FF',
            opacity: 0.7
          },
          '100%': {
            boxShadow: '0 0 10px #00D4FF, 0 0 20px #00D4FF, 0 0 30px #00D4FF',
            opacity: 1
          }
        },
        typing: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 }
        },
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        'stream-glow': {
          '0%': { boxShadow: '0 0 5px #00D4FF' },
          '100%': { boxShadow: '0 0 15px #00D4FF, 0 0 25px #00D4FF' }
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 10px #00D4FF, 0 0 20px #00D4FF, 0 0 30px #00D4FF',
        'neon-magenta': '0 0 10px #FF00FF, 0 0 20px #FF00FF, 0 0 30px #FF00FF',
        'neon-gold': '0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 30px #FFD700',
        'glow-soft': '0 0 15px rgba(0, 212, 255, 0.3)',
        'glow-strong': '0 0 25px rgba(0, 212, 255, 0.6)'
      },
      backdropBlur: {
        'xs': '2px'
      }
    },
  },
  plugins: [],
}
