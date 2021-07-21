const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

function half(value) {
  return value.replace(/\d+(.\d+)?/, number => number / 2)
}

module.exports = {
  mode: 'jit',
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
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    plugin(({ addUtilities, e, theme, variants }) => {
      Object.entries(theme('gap')).forEach(([key, value]) =>
        addUtilities(
          {
            [`.flex-gap-${e(key)}`]: {
              margin: `-${half(value)}`,
              '& > *': {
                margin: half(value)
              }
            },
            [`.flex-gap-x-${e(key)}`]: {
              marginRight: `-${half(value)}`,
              marginLeft: `-${half(value)}`,
              '& > *': {
                marginRight: half(value),
                marginLeft: half(value)
              }
            },
            [`.flex-gap-y-${e(key)}`]: {
              marginTop: `-${half(value)}`,
              marginBottom: `-${half(value)}`,
              '& > *': {
                marginTop: half(value),
                marginBottom: half(value)
              }
            }
          },
          variants('gap')
        )
      )
    })
  ]
}
