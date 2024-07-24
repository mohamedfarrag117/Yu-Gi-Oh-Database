/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkmode: "class",
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "background-alternative": "url('./src/assets/images/yu7.png')",
        "search-background": "url('./src/assets/images/yu6.jpg')",
        "cards-bg": "url('./src/assets/images/mech.jpg')",
        // Add more background images as needed
      }),
    },
  },
  plugins: [require("tailwindcss-animated")],
};
