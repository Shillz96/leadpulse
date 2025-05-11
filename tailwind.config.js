/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        marigold: '#E89C31',
        'muted-sky-blue': '#A9C7D5',
        'soft-fern': '#92A680',
        'peony-pink': '#F291A2',
        'warm-ivory': '#F8EDE3',
        goldenrod: '#F2C94C',
        'bright-white': '#FEFEFE',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}; 