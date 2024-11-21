/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
     "./node_modules/flowbite/**/*.jsx,js,tsx"
  ],
  theme: {
    extend: {
      colors: {
        green: {
          500: "#39a900"
        }
      }
    },
  },
  plugins: [require('flowbite/plugin')],
};
