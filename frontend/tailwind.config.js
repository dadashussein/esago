/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: { 500: "#33CC8C", 400: "rgba(82, 224, 165, 0.30)", 300: "#9EFAD4 ", 100: "#F0FFF9" },
        darkPrimary: { 800: "#2A3C35", 500: "#708F82", 100: "#C9D9D2" },
        //darkColor: { 1: "#31363F", 2: "#232429" },
        darkColor: { "bg": "#181818", "menu": "#212121", "hover": "#3D3D3D", "text": "#FFFFFF", "border": "#AAAAAA" },
        neytral: { 500: "#FAFAFA" },
        "bg-primary": "#F9FBFA",
      },
      screens: {
        'sm': '414px',
        // => @media (min-width: 640px) { ... }

        'md': '995px',
        // => @media (min-width: 1024px) { ... }

        'lg': '1042px',
        // => @media (min-width: 1280px) { ... }
      },
      boxShadow: {
        shadowOne: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        shadowTwo: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
      },
      backgroundImage: {
        'footer-texture': 'url("@/assets/svgs/footerBg.svg")',
        'landing-texture': 'url("@/assets/svgs/landingBg.svg")',
        "dash": 'url("@/assets/dash.jpg")',
      },

    },
  }
};