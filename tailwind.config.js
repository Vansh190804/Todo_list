/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      customGrey: "rgb(74 80 82)",
      customBlue: "rgb(23 54 68)",
      customSkin: "rgb(238 208 209)"
      },
      screens: {
        'mj': '940px', 
      }
  },
  plugins: [],
 }
} 