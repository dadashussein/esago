/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { 500: "#33CC8C", 400: "rgba(82, 224, 165, 0.30)", 300: "#9EFAD4 ", 100: "#F0FFF9" },
        darkPrimary: { 800: "#2A3C35", 500: "#708F82", 100: "#C9D9D2" },
        darkColor: { 1: "#31363F", 2: "#232429" },
        neytral: { 500: "#FAFAFA" },
        "bg-primary": "#F9FBFA",
      },
    },
  }
};