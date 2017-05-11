/* Created by Aquariuslt on 14/04/2017.*/

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import pathUtil from '../util/path-util';
import baseConfig from './base.config';

let webpackBaseConfig = {
  entry: {
    main: './src/main.js',
    styles: './src/styles.css'
  },
  resolve: {
    extensions: [
      '.js',
      '.vue'
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          pathUtil.root(baseConfig.dir.src),
          pathUtil.root(baseConfig.dir.test.unit),
          pathUtil.root(baseConfig.dir.test.e2e)
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: pathUtil.root(baseConfig.dir.src),
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./${baseConfig.dir.src}/index.html`,
      favicon: `./${baseConfig.dir.src}/${baseConfig.file.favicon}`
    })
  ]
};

export default webpackBaseConfig;
