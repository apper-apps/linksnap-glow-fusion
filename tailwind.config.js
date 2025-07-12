/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          600: '#5B21B6',
          500: '#7C3AED',
          400: '#8B5CF6',
        },
        accent: {
          500: '#EC4899',
          400: '#F472B6',
        },
success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      scale: {
        '95': '0.95',
        '98': '0.98',
        '102': '1.02',
        '105': '1.05',
        '110': '1.10',
      },
      animation: {
        'pulse-scale': 'pulse-scale 0.3s ease-out',
        'copy-success': 'copy-success 0.5s ease-out',
      },
      keyframes: {
        'pulse-scale': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.98)' },
          '100%': { transform: 'scale(1)' },
        },
        'copy-success': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
    },
  },
  plugins: [],
}