/* Created by Aquariuslt on 16/04/2017.*/
import gulp from 'gulp';
import log from 'fancy-log';

import opn from 'opn';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import addEntries from 'webpack-dev-server/lib/utils/addEntries';

import baseConfig from '../config/base.config';
import webpackDevConfig from '../config/webpack.dev.babel';

const AUTO_OPEN_URL = 'http://' + baseConfig.dev.host + ':' + baseConfig.dev.port;

gulp.task('serve', function() {
  log.info('Webpack building.');
  addEntries(webpackDevConfig, webpackDevConfig.devServer);
  let compilerConfig = webpack(webpackDevConfig);
  new WebpackDevServer(compilerConfig, webpackDevConfig.devServer).listen(webpackDevConfig.devServer.port, webpackDevConfig.devServer.host, function(error) {
    if (error) {
      log.error('Webpack build error:', error);
    }
    log.info('Open:', AUTO_OPEN_URL);
    opn(AUTO_OPEN_URL);
  });
});
