/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    blue: '#93B5C6',
                    yellow: '#F0CF65',
                    orange: '#D7816A',
                    lime: '#DDEDAA',
                    deep: '#026D8E',
                    card: '#D3EBF0',
                    bg: '#E4F3F2',
                    soft: '#E1F7F7',
                    cream: '#F2F2E9'
                }
            },
            fontFamily: {
                sans: ['"Gill Sans"', '"Gill Sans MT"', 'Helvetica', 'Arial', 'sans-serif'],
                script: ['"Great Vibes"', 'cursive'],
                serif: ['Constantia', 'Georgia', 'serif']
            },
            keyframes: {
                shake: {
                    '0%, 100%': { transform: 'translate(1px, 1px) rotate(0deg)' },
                    '10%': { transform: 'translate(-1px, -2px) rotate(-1deg)' },
                    '20%': { transform: 'translate(-3px, 0px) rotate(1deg)' },
                    '30%': { transform: 'translate(3px, 2px) rotate(0deg)' },
                    '40%': { transform: 'translate(1px, -1px) rotate(1deg)' },
                    '50%': { transform: 'translate(-1px, 2px) rotate(-1deg)' },
                    '60%': { transform: 'translate(-3px, 1px) rotate(0deg)' },
                    '70%': { transform: 'translate(3px, 1px) rotate(-1deg)' },
                    '80%': { transform: 'translate(-1px, -1px) rotate(1deg)' },
                    '90%': { transform: 'translate(1px, 2px) rotate(0deg)' }
                }
            },
            animation: {
                shake: 'shake 0.5s infinite'
            }
        }
    },
    plugins: []
}