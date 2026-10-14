/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        primary: '#173d38', // dark green
        'primary-600': '#285a51',
        accent: '#d86d43', // warm orange
        neutral: {
          50: '#fafaf8',
          100: '#f5f5f3',
          300: '#e6e6e5',
          700: '#4b5563'
        }
      },
      fontFamily: {
        serif: ['Georgia', "Times New Roman", 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system']
      },
      borderRadius: {
        xl: '1rem'
      }
    },
  },
  plugins: [],
}
