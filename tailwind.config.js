/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['"Inter"', 'sans-serif'],
      dm: ['"DM Sans"', 'sans-serif'],
      sora: ['"Sora"', 'sans-serif'],
      bric: ['"Bricolage Grotesque"', 'sans-serif']
    }

  },
  plugins: [
    require('preline/plugin'),
    require('@tailwindcss/forms'),
  ],
}