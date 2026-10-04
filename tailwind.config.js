/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy:   '#030303',
        purple: '#9333EA',
        cyan:   '#00E5FF',
        ice:    '#F0F0FF',
        card:   '#0D0D0D',
        border: '#1A1A2E',
      },
      fontFamily: {
        display: ["'Syne'", "'Cairo'", 'sans-serif'],
        body: ["'Inter'", "'Cairo'", 'sans-serif'],
      },
    },
  },
  plugins: [],
};
