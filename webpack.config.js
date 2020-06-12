const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new CopyPlugin([
      { from: './assets', to: './assets/' },
      { from: './favicon.ico', to: './' },
      { from: './manifest.json', to: './' },
      { from: './pwabuilder-sw.js', to: './' },
      { from: './install.js', to: './' }
    ]),
    new HtmlWebpackPlugin()
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
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      }
    ]
  },
  // Optional for webpack-dev-server
  devServer: {
    watchContentBase: true,
    contentBase: path.resolve(__dirname, 'dist'),
    open: true
  }
};
