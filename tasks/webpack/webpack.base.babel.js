/* Created by Aquariuslt on 4/11/17.*/

import * as pathUtil from '../util/path-util';

let baseWebpackConfig = {
  entry: {
    main: './src/main.js',
    vendor: './src/vendor.js',
    styles: './src/style.css'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {}
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          pathUtil.root('src'),
          pathUtil.root('test')
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader?name=assets/[name].[ext]'
      },
    ]
  }
};


export default baseWebpackConfig;
