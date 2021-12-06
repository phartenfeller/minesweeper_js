const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  purge: ['./index.html', './src/**/*.js'],
  theme: {
    extend: {
      colors: {
        salmon: '#ff7367',
        darkerGreen: '#087d51',
        coal: '#2b303b',
        darkCoal: '#23262f',
        darkCoalTransparent: '#23262f80',
        blueGray: colors.blueGray,
        coolGray: colors.coolGray,
        trueGray: colors.trueGray,
        lightBlue: colors.lightBlue
      },
      opacity: {
        85: '0.85',
        75: '0.75'
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui'),
    plugin(({ addUtilities }) => {
      const customClasses = {
        '.background-blur-3': {
          'backdrop-filter': ' blur(3px)'
        },
        '.background-blur-5': {
          'backdrop-filter': ' blur(5px)'
        }
      };

      addUtilities(customClasses, []);
    })
  ]
};
