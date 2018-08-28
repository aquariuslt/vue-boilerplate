/* Created by Aquariuslt on 5/10/17.*/
import webpack from 'webpack';
import merge from 'webpack-merge';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';

import webpackBaseConfig from './webpack.base.babel';
import vueLoaderUtil from './utils/vue-loader-util';

let webpackTestConfig = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"testing"'
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].bundle.css'
    }),
    new VueLoaderPlugin()
  ]

});

delete webpackTestConfig.entry;
export default webpackTestConfig;
