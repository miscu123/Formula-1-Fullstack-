/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  purge: ['./client-server/f1-app/src/**/*.{js,jsx,ts,tsx}', './client-server/f1-app/index.html'],
  mode: 'jit',
  darkMode: false,
  theme: {
    extend: {},
  },
  plugins: [],
}