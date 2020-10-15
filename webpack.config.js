/* eslint-disable global-require */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
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
  const mode = process.env.MODE;
  const prod = mode === 'production';
  console.log(`Webpack mode => ${mode}, prod ${prod}`);
  return {
    entry: './src/index.js',
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          { from: './assets', to: './assets/' },
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
          pattern: '@@{robots_meta}',
          replacement: prod
            ? null
            : `<meta name="robots" content="noindex" />
               <meta name="monetization" content="$ilp.uphold.com/dhUZx4rikrgf">`
        }
      ])
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserJSPlugin({
          terserOptions: {
            compress: {
              drop_console: prod
            }
          }
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
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
};
