/* Created by Aquariuslt on 14/04/2017.*/

import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';

import webpackBaseConfig from './webpack.base.babel';
import vueLoaderUtil from './utils/vue-loader-util';
import baseConfig from './base.config';
import pathUtil from './utils/path-util';

let webpackProdConfig = merge(webpackBaseConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: pathUtil.resolve(baseConfig.dir.dist.root),
    filename: baseConfig.dir.dist.js + '/' + '[name].[chunkhash].js',
    chunkFilename: baseConfig.dir.dist.js + '/' + '[id].[chunkhash].js',
    publicPath: baseConfig.prod.context + '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderUtil.buildVueStylesLoader({
          sourceMap: true,
          extract: true,
          minimize: true
        })
      }
    ]
  },
  plugins: [
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        safe: true,
        discardComments: {
          removeAll: true
        }
      },
      canPrint: false
    }),
    new ExtractTextPlugin({
      filename: baseConfig.dir.dist.css + '/' + '[name].[chunkhash].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: `./${baseConfig.dir.src}/index.html`,
      favicon: `./${baseConfig.dir.src}/${baseConfig.file.favicon}`,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
      },
      chunksSortMode: 'dependency'
    }),
    new CopyWebpackPlugin(baseConfig.dir.assets),
    new OfflinePlugin({
      ServiceWorker: {
        minify: true
      }
    }),
    new VueLoaderPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          filename: baseConfig.dir.dist.js + '/' + 'vendor.[chunkhash].js',
          chunks: 'all'
        }
      }
    }
  },
  stats: {
    colors: true,
    env: true,
    hash: true,
    timings: true,
    chunks: true,
    chunkModules: false,
    chunksSort: 'field',
    children: false,
    modules: false,
    reasons: false,
    warnings: false,
    assets: false,
    version: true,
    publicPath: true
  }
});

export default webpackProdConfig;
