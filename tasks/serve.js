/* Created by Aquariuslt on 16/04/2017.*/
import gulp from 'gulp';
import log from 'fancy-log';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import addDevServerEntrypoints from 'webpack-dev-server/lib/util/addDevServerEntrypoints';

import webpackDevConfig from '../config/webpack.dev.babel';

gulp.task('serve', function() {
  log.info('Webpack building.');
  addDevServerEntrypoints(webpackDevConfig, webpackDevConfig.devServer);
  let compilerConfig = webpack(webpackDevConfig);
  new WebpackDevServer(compilerConfig, webpackDevConfig.devServer).listen(webpackDevConfig.devServer.port, webpackDevConfig.devServer.host, function(error) {
    if (error) {
      log.error('Webpack build error:', error);
    }
  });
});
