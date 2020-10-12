const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: './assets', to: './assets/' },
      { from: './favicon.ico', to: './' },
      { from: './manifest.json', to: './' },
      { from: './pwabuilder-sw.js', to: './' },
      { from: './install.js', to: './' },
      { from: './sitemap.xml', to: './' }
    ]),
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css',
      chunkFilename: 'styles.[contenthash].css'
    }),
    new HtmlWebpackPlugin({ filename: 'index.html', template: 'index.html' })
  ],
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js'
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
          MiniCssExtractPlugin.loader,
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
