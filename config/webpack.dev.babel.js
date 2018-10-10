/* Created by Aquariuslt on 14/04/2017.*/
import webpack from 'webpack';
import merge from 'webpack-merge';
import webpackBaseConfig from './webpack.base.babel';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';

import pathUtil from './utils/path-util';

import baseConfig from './base.config';

const PROTOCOL = 'http://';

let webpackDevConfig = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    path: pathUtil.resolve(baseConfig.dir.build),
    publicPath: PROTOCOL + baseConfig.dev.host + ':' + baseConfig.dev.port + '/',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.js.map',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        include: pathUtil.resolve(baseConfig.dir.src),
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        include: pathUtil.resolve(baseConfig.dir.src),
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].bundle.css'
    }),
    new HtmlWebpackPlugin({
      template: baseConfig.dir.src + '/index.html',
      favicon: baseConfig.dir.src + '/' + baseConfig.file.favicon
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
    new VueLoaderPlugin()
  ],
  devServer: {
    host: baseConfig.dev.host,
    port: baseConfig.dev.port,
    historyApiFallback: true,
    open: true,
    quiet: false,
    noInfo: true,
    stats: {
      cached: false,
      assets: false,
      colors: true,
      version: false,
      hash: false,
      children: false,
      timings: true,
      chunks: true,
      chunkModules: false
    },
    publicPath: PROTOCOL + baseConfig.dev.host + ':' + baseConfig.dev.port
  }
});

export default webpackDevConfig;
