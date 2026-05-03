import forms from '@tailwindcss/forms'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f7ff',
          100: '#e6ecff',
          500: '#3f72af',
          700: '#1f4b82'
        }
      }
    }
  },
  plugins: [forms]
}
