/* Created by Aquariuslt on 14/04/2017.*/

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
      '@': pathUtil.resolve(baseConfig.dir.src),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
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
          limit: 10000,
          name: baseConfig.dir.dist.fonts + '/' + '[name].[ext]'
        }
      },
      {
        test: /\.properties$/,
        include: pathUtil.resolve(baseConfig.dir.src),
        loader: 'properties-json-loader'
      }
    ]
  }
};

export default webpackBaseConfig;
