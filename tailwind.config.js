/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        ink: '#18212f',
        paper: '#f7f4ed',
        moss: '#4b6655',
        coral: '#e66d5c',
        wheat: '#f0d9a4',
      },
      boxShadow: {
        soft: '0 18px 50px rgba(24, 33, 47, 0.10)',
      },
    },
  },
  plugins: [],
};
