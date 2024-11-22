/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#008aff",
        secondary: "#66b8ff",
        accent: "#a2d5f2",
        black: "#111111",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
