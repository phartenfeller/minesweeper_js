const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './index.js',
  plugins: [
    new CopyPlugin([
      { from: './index.html', to: './' },
      { from: './src/css', to: './src/css' },
      { from: './assets', to: './assets/' },
      { from: './favicon.ico', to: './' }
    ])
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};
