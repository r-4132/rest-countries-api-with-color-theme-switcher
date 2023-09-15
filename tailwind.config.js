/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        darkBlue:'var(--darkBlue)',
        veryDarkBlue:'var(--veryDarkBlue)',
        veryDarkBlueLight:'var(--veryDarkBlueLight)',
        darkGray:'var(--darkGray)',
        lightGray:'var(--lightGray)',
        white:'var(--white)',
      }
    },
  },
  plugins: [],
}

