/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      'orange': '#ffb471',
      'black': '#21170f',
      'skyBlue': '#c0ddef',
      'lightblue':'#abcfe7',
      'white': '#ffffff',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
    },
    extend: {
      backgroundImage: {
        'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
