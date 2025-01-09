/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      backgroundImage: {
        "custom-bg": "url('/assets/bg.jpg')",
        "custom-about-bg": "url('/assets/about.jpg')",
      },
      screens: {
        xs: { min: "300px", max: "800px" },
        cs: { min: "801px", max: "1024px" },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        bounce: "bounce 1.5s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(-10px)",
          },
          "50%": {
            transform: "translateY(10px)",
          },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-20px)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      plugins: [],
      important: true,
    },
  },
};
