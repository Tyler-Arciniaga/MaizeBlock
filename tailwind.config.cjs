/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "michigan-blue": "#00274C",
        "michigan-maize": "#FFCB05",
      },
    },
  },
  plugins: [],
};
