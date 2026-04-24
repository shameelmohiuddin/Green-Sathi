/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#1E4334",
        secondary: "#D3E8D5",
        background: "#FAFCFB",
        charcoal: "#1A1A1A",
        "accent-gold": "#F4A261",
        "accent-lime": "#A7C957",
        "accent-orange": "#E07A5F"
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
      }
    },
  },
  plugins: [],
}
