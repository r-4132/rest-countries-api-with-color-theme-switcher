/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        darkBlue:'var(--darkBlue)',
        veryDarkBlueDark:'var(--veryDarkBlueDark)',
        veryDarkBlueLight:'var(--veryDarkBlueLight)',
        darkGray:'var(--darkGray)',
        lightGray:'var(--lightGray)',
        white:'var(--white)',
      }
    },
  },
  plugins: [],
}

