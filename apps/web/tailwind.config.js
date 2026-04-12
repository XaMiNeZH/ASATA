/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          dark:    '#0D47A1',
          DEFAULT: '#1565C0',
          mid:     '#1E88E5',
          light:   '#42A5F5',
          pale:    '#E3F2FD',
          ghost:   '#F0F8FF',
        },
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body:    ['Open Sans', 'sans-serif'],
      },
      boxShadow: {
        'blue-sm': '0 2px 10px rgba(21,101,192,.10)',
        'blue-md': '0 8px 32px rgba(21,101,192,.14)',
        'blue-lg': '0 24px 64px rgba(21,101,192,.18)',
      },
      borderRadius: {
        xl2: '20px',
        xl3: '32px',
      },
    },
  },
  plugins: [],
}
