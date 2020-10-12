module.exports = {
  purge: ['./index.html', './src/**/*.js'],
  theme: {
    extend: {
      opacity: {
        '85': '0.85'
      }
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/ui')]
};
