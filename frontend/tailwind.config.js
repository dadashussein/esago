/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        'input:focus': {
          outline: 'none',
        },
        'textarea:focus': {
          outline: 'none',
        },
        'select:focus': {
          outline: 'none',
        },
      });
    },
  ],
}

