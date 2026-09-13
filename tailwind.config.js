/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1B2B2B',
        paper: '#F4F6F5',
        teal: {
          DEFAULT: '#146C6B',
          dark: '#0E4E4D',
          light: '#DCEDEC',
        },
        gold: '#D9A441',
        income: '#4C8C4B',
        expense: '#C8553D',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
