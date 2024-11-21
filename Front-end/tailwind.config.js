/* eslint-disable no-undef */
import flowbite  from "flowbite-react/tailwind"
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
          500: "#39a900",
        },
      },
    },
  },
  plugins: [ require("flowbite/plugin")],
};
