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
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#5048e5',
          700: '#4338ca',
        },
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        surface: '#f8fafc',
        mood: {
          happy: '#fbbf24',
          neutral: '#6b7280',
          stressed: '#ef4444',
        }
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'scale-in': 'scale-in 0.2s ease-out',
        'progress-fill': 'progress-fill 1s ease-out',
        'mood-drift': 'mood-drift 2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'progress-fill': {
          '0%': { strokeDashoffset: '100%' },
          '100%': { strokeDashoffset: '0%' },
        },
        'mood-drift': {
          '0%': { transform: 'translateY(0px)', opacity: '1' },
          '100%': { transform: 'translateY(-40px)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}