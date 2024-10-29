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
        },
    },
    plugins: [],
}