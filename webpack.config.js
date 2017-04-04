const path = require('path');

const webpack = require('webpack');
const HappyPack = require('happypack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
  entry: path.resolve(APP_PATH, 'index.js'),
  output: {
    path: BUILD_PATH,
    filename: 'bundle-[hash:5].js',
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    host: '',
    port: '8088',
    contentBase: ROOT_PATH,
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [/*{
      enforce: "pre",
      test: /\.js[x]?$/,
      use: [
        'eslint-loader',
      ],
      include: APP_PATH
    }, */{
      test: /\.js[x]?$/,
      use: [
        'babel-loader',
      ],
      include: APP_PATH
    }],
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'babel-polyfill': 'window',
  },
  plugins: [
    new HappyPack({
      loaders: [{
        loader: 'babel-loader'
      }],
      threads: 2
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(APP_PATH, 'index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    //new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
  ],
};
