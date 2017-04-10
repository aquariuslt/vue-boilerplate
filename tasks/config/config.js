/* Created by Aquariuslt on 4/11/17.*/


import * as pathUtil from '../util/path-util';

let config = {
  build: {
    index: pathUtil.root('dist', 'index.html'),
    assetsRoot: pathUtil.root('dist'),
    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
  },
  dev: {
    port: 4200,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false
  }
};

export default config;
