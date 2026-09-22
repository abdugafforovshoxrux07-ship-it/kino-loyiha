/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f2',
          100: '#ffe1e3',
          200: '#ffc7cb',
          300: '#ff9fa7',
          400: '#fd6b78',
          500: '#f53d51',
          600: '#e11d3c',
          700: '#bd1332',
          800: '#9d1330',
          900: '#86142f',
          950: '#4a0715',
        },
        surface: {
          light: '#f7f7fb',
          dark: '#0b0d14',
        },
        card: {
          light: '#ffffff',
          dark: '#151823',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(0, 0, 0, 0.35)',
        glow: '0 0 0 1px rgba(245, 61, 81, 0.4), 0 8px 24px -6px rgba(245, 61, 81, 0.45)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out both',
        shimmer: 'shimmer 1.6s linear infinite',
        scaleIn: 'scaleIn 0.35s ease-out both',
      },
    },
  },
  plugins: [],
}
