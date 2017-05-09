/* Created by Aquariuslt on 5/10/17.*/
import webpack from 'webpack';
import merge from 'webpack-merge';


import ExtractTextPlugin from 'extract-text-webpack-plugin';

import devConfig from './dev.config';
import webpackBaseConfig from './webpack.base.config.babel';
import vueLoaderUtil from '../util/vue-loader-util';


let webpackTestConfig = merge(webpackBaseConfig, {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderUtil.buildVueStylesLoader({
          sourceMap: true,
          extract: false,
          minimize: false
        })
      }
    ]
  },
  devtool: '#inline-source-map',
  resolveLoader: {
    alias: {
      'scss-loader': 'sass-loader'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"testing"'
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].bundle.css'
    })
  ],
  devServer: {
    proxy: devConfig.devServer.proxy
  }

});

delete webpackTestConfig.entry;
export default webpackTestConfig;
