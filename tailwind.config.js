const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Recoleta', ...defaultTheme.fontFamily.serif],
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        gray: colors.trueGray
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')]
}
