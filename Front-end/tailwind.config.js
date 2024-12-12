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
  darkMode: "class",
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
          900: "#0e3201",
        },
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
      },
    },
    fontFamily: {
      body: [
        "-apple-system",
        "sans-serif",
        "Roboto",
        "Noto Color Emoji",
        "Arial",
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "system-ui",
        "Segoe UI",
        "Helvetica Neue",
        "Noto Sans",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
      ],
      sans: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      RobotoSlab: [
        "Roboto Slab"
      ],
      VampiroOne: [
        "Vampiro One"
      ],
    },
  },
  plugins: [require("flowbite/plugin")],
};