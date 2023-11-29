/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        luckiest: ['LuckiestGuy', 'sans-serif'],
      },
      colors: {
        darkGreen: '#3A4D39',
        primaryGreen: '#739072',
        secondaryGreen: '#4F6F52',
      },
    },
  },
  plugins: [],
}

