/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false,
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('/assets/bg.jpg')",
        'custom-about-bg':"url('/assets/about.jpg')",
      },
      screens: {
        'xs': { 'min': '300px', 'max': '800px' },
        'cs': { 'min': '801px', 'max': '1024px' },
    },
    },
  },
  plugins: [],
  important: true,
}

