/* Created by Aquariuslt on 14/04/2017.*/

import merge from 'webpack-merge';
import baseConfig from './base.config';
import * as pathUtil from '../util/path-util';

let prodConfig = merge(baseConfig, {
  output: {
    path: pathUtil.root('dist')
  }
});

export default prodConfig;
