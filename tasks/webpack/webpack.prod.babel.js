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
                  'minimize': false,
                  'sourceMap': false
                }
              }
            ],
            'less': [
              'vue-style-loader',
              {
                'loader': 'css-loader',
                'options': {
                  'minimize': false,
                  'sourceMap': false
                }
              },
              {
                'loader': 'less-loader',
                'options': {
                  'sourceMap': false
                }
              }
            ],
            'sass': [
              'vue-style-loader',
              {
                'loader': 'css-loader',
                'options': {
                  'minimize': false,
                  'sourceMap': false
                }
              },
              {
                'loader': 'sass-loader',
                'options': {
                  'indentedSyntax': true,
                  'sourceMap': false
                }
              }
            ],
            'scss': [
              'vue-style-loader',
              {
                'loader': 'css-loader',
                'options': {
                  'minimize': false,
                  'sourceMap': false
                }
              },
              {
                'loader': 'sass-loader',
                'options': {
                  'sourceMap': false
                }
              }
            ],
            'stylus': [
              'vue-style-loader',
              {
                'loader': 'css-loader',
                'options': {
                  'minimize': false,
                  'sourceMap': false
                }
              },
              {
                'loader': 'stylus-loader',
                'options': {
                  'sourceMap': false
                }
              }
            ],
            'styl': [
              'vue-style-loader',
              {
                'loader': 'css-loader',
                'options': {
                  'minimize': false,
                  'sourceMap': false
                }
              },
              {
                'loader': 'stylus-loader',
                'options': {
                  'sourceMap': false
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
        loader: 'file-loader?name=assets/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': 'production'
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
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
      },
      chunksSortMode: 'dependency'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: [
        'main',
        'vendor',
        'styles'
      ]
    })
  ]
});

export default prodConfig;
