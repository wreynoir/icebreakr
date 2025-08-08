
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ice: {
          50: "#f3f8fc",
          100: "#e6f0f8",
          200: "#cfe2f1",
          300: "#a7c9e4",
          400: "#7db0d7",
          500: "#5899cb",
          600: "#3f7eb1",
          700: "#33658c",
          800: "#27455f",
          900: "#1b2f41"
        }
      }
    },
  },
  plugins: [],
}
