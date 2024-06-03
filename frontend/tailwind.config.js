/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { 500: "#33CC8C", 400: "rgba(82, 224, 165, 0.30)" },
        darkPrimary: { 800: "#2A3C35", 500: "#708F82", 100: "#C9D9D2" },
        neytral: { 500: "#FAFAFA" },
        "bg-primary": "#F9FBFA",
      },
    },
  }
};