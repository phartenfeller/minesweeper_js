const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './index.js',
  plugins: [
    new CopyPlugin([
      { from: './index.html', to: './' },
      // { from: './src/css', to: './src/css' },
      { from: './assets', to: './assets/' },
      { from: './favicon.ico', to: './' },
      { from: './manifest.json', to: './' },
      { from: './service-worker.js', to: './' },
      { from: './install.js', to: './' }
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
