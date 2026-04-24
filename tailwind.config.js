/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E4334",
        secondary: "#D3E8D5",
        background: "#FAFCFB",
        charcoal: "#1A1A1A"
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
      }
    },
  },
  plugins: [],
}
