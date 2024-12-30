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
    },
  },
  plugins: [],
  important: true,
}

