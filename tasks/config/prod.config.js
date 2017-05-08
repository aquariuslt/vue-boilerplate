/* Created by Aquariuslt on 14/04/2017.*/

import merge from 'webpack-merge';
import baseConfig from './base.config';
import pathUtil from '../util/path-util';

let prodConfig = merge(baseConfig, {
  output: {
    path: pathUtil.root(baseConfig.dir.dist)
  }
});


export default prodConfig;
