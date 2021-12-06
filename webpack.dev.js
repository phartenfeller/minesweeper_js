/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');

const getVersion = mode => {
  const { version } = require('./package.json');
  if (mode === 'production') {
    return version;
  }
  return `${version}-${mode}`;
};

// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => {
  const mode = 'dev';
  console.log(`Webpack mode => ${mode}`);
  return {
    entry: './src/index.js',
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          { from: './assets', to: './assets/' },
          { from: './src/css', to: './css/' },
          { from: './favicon.ico', to: './' },
          { from: './manifest.json', to: './' },
          { from: './pwabuilder-sw.js', to: './' },
          { from: './install.js', to: './' },
          { from: './sitemap.xml', to: './' }
        ]
      }),
      // new BundleAnalyzerPlugin(),
      new MiniCssExtractPlugin({
        filename: 'styles.[contenthash].css',
        chunkFilename: 'styles.[contenthash].css'
      }),
      new HtmlWebpackPlugin({ filename: 'index.html', template: 'index.html' }),
      new HtmlReplaceWebpackPlugin([
        {
          pattern: '@@{version}',
          replacement: getVersion(mode)
        },
        {
          pattern: '@@{conditional_headers}',
          replacement: `<meta name="robots" content="noindex" />`
        }
      ])
    ],
    optimization: {
      minimize: false
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
          test: /\.(ttf|eot|svg|png|jpg|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
            'postcss-loader'
          ]
        }
      ]
    },
    // Optional for webpack-dev-server
    devServer: {}
  };
};
