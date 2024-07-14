/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const { mauve, violet, red, blackA } = require('@radix-ui/colors');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        primary: { 500: "#33CC8C", 400: "rgba(82, 224, 165, 0.30)", 300: "#9EFAD4 ", 100: "#F0FFF9" },
        darkPrimary: { 800: "#2A3C35", 500: "#708F82", 100: "#C9D9D2" },
        //darkColor: { 1: "#31363F", 2: "#232429" },
        darkColor: { "bg": "#181818", "menu": "#212121", "hover": "#3D3D3D", "text": "#FFFFFF", "border": "#AAAAAA" },
        neytral: { 500: "#FAFAFA" },
        "bg-primary": "#F9FBFA",
        ...mauve,
        ...violet,
        ...red,
        ...blackA,
      },
      screens: {
        'sm': '414px',
        'md': '995px',
        'lg': '1042px',
      },
      boxShadow: {
        shadowOne: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        shadowTwo: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        alertBoxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px'
      },
      backgroundImage: {
        'footer-texture': 'url("@/assets/svgs/footerSvg.svg")',
        'landing-texture': 'url("@/assets/svgs/landingBg.svg")',
        "dash": 'url("@/assets/dash.jpg")',
      },
      keyframes: {
        overlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        contentShow: {
          from: { opacity: '0', transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },

    },
  },
};