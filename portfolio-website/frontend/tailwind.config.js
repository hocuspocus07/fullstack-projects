/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{html,js}"],
    theme: {
        extend: {
            colors: {
                'windowColor': '#017D7D'
            },
            fontFamily: {
                win95font: ['win95font', 'sans-serif'],
            },
            screens: {
                'xs': { 'min': '300px', 'max': '800px' },
                'cs': { 'min': '801px', 'max': '1024px' },
            },
        },
    },
    plugins: [],
}