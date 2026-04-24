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
        "accent-gold": "rgb(var(--accent-gold) / <alpha-value>)",
        "accent-lime": "rgb(var(--accent-lime) / <alpha-value>)",
        "accent-orange": "rgb(var(--accent-orange) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
      }
    },
  },
  plugins: [],
}
