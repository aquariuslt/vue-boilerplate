/* Created by Aquariuslt on 4/11/17.*/
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import baseWebpackConfig from './webpack.base.babel';
import * as pathUtil from '../util/path-util';


let prodConfig = webpackMerge(baseWebpackConfig, {
  devtool: 'source-map',
  output: {
    path: pathUtil.root('dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'css': [
              'vue-style-loader',
              {
                'loader': 'css-loader',
                'options': {
                  'minimize': true,
                  'sourceMap': true
                }
              }
            ],
            'postcss': [
              'vue-style-loader',
              {
                'loader': 'css-loader',
                'options': {
                  'minimize': true,
                  'sourceMap': true
                }
              }
            ],
            'less': [
              'vue-style-loader',
              {
                'loader': 'css-loader',
                'options': {
                  'minimize': true,
                  'sourceMap': true
                }
              },
              {
                'loader': 'less-loader',
                'options': {
                  'sourceMap': true
                }
              }
            ],
            'sass': [
              'vue-style-loader',
              {
                'loader': 'css-loader',
                'options': {
                  'minimize': true,
                  'sourceMap': true
                }
              },
              {
                'loader': 'sass-loader',
                'options': {
                  'indentedSyntax': true,
                  'sourceMap': true
                }
              }
            ],
            'scss': [
              'vue-style-loader',
              {
                'loader': 'css-loader',
                'options': {
                  'minimize': true,
                  'sourceMap': false
                }
              },
              {
                'loader': 'sass-loader',
                'options': {
                  'minimize': true,
                  'sourceMap': false
                }
              }
            ],
            'stylus': [
              'vue-style-loader',
              {
                'loader': 'css-loader',
                'options': {
                  'minimize': true,
                  'sourceMap': true
                }
              },
              {
                'loader': 'stylus-loader',
                'options': {
                  'sourceMap': true
                }
              }
            ],
            'styl': [
              'vue-style-loader',
              {
                'loader': 'css-loader',
                'options': {
                  'minimize': true,
                  'sourceMap': true
                }
              },
              {
                'loader': 'stylus-loader',
                'options': {
                  'sourceMap': true
                }
              }
            ]
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          pathUtil.root('src')
        ]
      },
      {
        test: /\.css$/,
        include: pathUtil.root('src'),
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap'
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: pathUtil.root('src', 'assets') + '[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.png',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
      },
      chunksSortMode: 'dependency'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            pathUtil.root('node_modules')
          ) === 0
        );
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
});

export default prodConfig;
