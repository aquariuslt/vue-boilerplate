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
                  'sourceMap': true
                }
              }
            ],
            'less': [
              'vue-style-loader',
              {
                'loader': 'css-loader',
                'options': {
                  'minimize': false,
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
                  'minimize': false,
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
                  'minimize': false,
                  'sourceMap': true
                }
              },
              {
                'loader': 'sass-loader',
                'options': {
                  'sourceMap': true
                }
              }
            ],
            'stylus': [
              'vue-style-loader',
              {
                'loader': 'css-loader',
                'options': {
                  'minimize': false,
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
                  'minimize': false,
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
        NODE_ENV: '"development"'
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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
    }),
    new ExtractTextPlugin({
      filename: '[name].bundle.css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.png'
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
