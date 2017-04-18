/* Created by Aquariuslt on 14/04/2017.*/

import merge from 'webpack-merge';
import baseConfig from './base.config';
import * as pathUtil from '../util/path-util';


/**
 * Update development environment configurable variables here.
 * */

const PROTOCOL = 'http://';
const HOST = '127.0.0.1';
const PORT = 5000;


let devConfig = merge(baseConfig, {
  output: {
    path: pathUtil.root('build'),
    publicPath: PROTOCOL + HOST + ':' + PORT
  },
  devServer: {
    host: HOST,
    port: PORT
  }
});

export default devConfig;
