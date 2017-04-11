import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import * as pathUtil from '../util/path-util';
import baseWebpackConfig from './webpack.base.babel';

const PROTOCOL = 'http://';
const HOST = 'localhost';
const PORT = 5000;

let devConfig = webpackMerge(baseWebpackConfig, {
  devtool: 'source-map',
  output: {
    path: pathUtil.root(),
    publicPath: PROTOCOL + HOST + ':' + PORT,
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map',
    chunkFilename: '[id].chunk.js'
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
                  'minimize': false,
                  'sourceMap': false
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
        loader: 'file-loader?name=/assets/img/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: [
        'main',
        'vendor',
        'styles'
      ]
    }),
    new ExtractTextPlugin({
      filename: '[name].bundle.css'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new FriendlyErrorsPlugin()
  ],
  devServer: {
    port: PORT,
    historyApiFallback: true,
    quiet: true,
    noInfo: true,
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
