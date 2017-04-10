/* Created by Aquariuslt on 4/11/17.*/

import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import * as pathUtil from '../util/path-util';
import baseWebpackConfig from './webpack.base.babel';

const PROTOCOL = 'http://';
const HOST = '0.0.0.0';
const PORT = 4200;

let devConfig = webpackMerge(baseWebpackConfig, {
  devtool: 'source-map',
  output: {
    path: pathUtil.root('dist'),
    publicPath: PROTOCOL + HOST + ':' + PORT,
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: [
        'main',
        'vendor',
        'styles'
      ]
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new FriendlyErrorsPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  }
});


export default devConfig;
