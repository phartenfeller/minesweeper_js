const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  purge: ['./index.html', './src/**/*.js'],
  theme: {
    colors: {
      ...colors
    },
    extend: {
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
