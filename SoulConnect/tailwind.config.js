/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
          loveLight: ['"Love Light"', 'cursive'],
          lora: ['Lora', 'serif'],
        },
    },
  },
  plugins: [],
}

//test