/* eslint-disable no-undef */
import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    flowbite.content(),
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.jsx,js,tsx",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50: "#dfffc7",
          100: "#c1ff95",
          200: "#98fe58",
          300: "#73f526",
          400: "#52dc06",
          500: "#39a900",
          600: "#2e8506",
          700: "#29690b",
          800: "#24580f",
          900: "#0e3201"
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
