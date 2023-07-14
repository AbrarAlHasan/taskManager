/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/Screens/**/*.{js,jsx,ts,tsx}',
    '"./src/Components/**/*.{js,jsx,ts,tsx}"',
  ],
  theme: {
    extend: {
      colors: {
        blackCSBg: '#1e1e1e',
      },
    },
  },
  plugins: [],
};
