/* Created by Aquariuslt on 14/04/2017.*/

import ExtractTextPlugin from 'extract-text-webpack-plugin';

import pathUtil from './utils/path-util';
import baseConfig from './base.config';

let webpackBaseConfig = {
  entry: {
    main: pathUtil.resolve(baseConfig.dir.src) + '/' + 'main.js'
  },
  resolve: {
    extensions: [
      '.js',
      '.vue'
    ],
    alias: {
      '@': pathUtil.resolve('src'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          pathUtil.resolve(baseConfig.dir.src),
          pathUtil.resolve(baseConfig.dir.test.unit),
          pathUtil.resolve(baseConfig.dir.test.e2e)
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        include: pathUtil.resolve('src'),
        loader: ExtractTextPlugin.extract({
          use: ['css-loader', 'less-loader'],
          fallback: ['style-loader']
        })
      },
      {
        test: /\.css$/,
        include: pathUtil.resolve(baseConfig.dir.src),
        loader: ExtractTextPlugin.extract({
          use: ['css-loader'],
          fallback: ['style-loader']
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          useRelativePath: true,
          publicPath: './',
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          useRelativePath: true,
          publicPath: './',
          name: '[name].[ext]'
        }
      }
    ]
  }
};

export default webpackBaseConfig;
