/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        theBlue: "#7eb2dd",
        theYellow: "#FF0",
        cardColor: "#FFDC83",
        someGreen: "#DEFFC3",
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
  ],
};
