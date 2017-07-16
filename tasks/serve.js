/* Created by Aquariuslt on 16/04/2017.*/
import gulp from 'gulp';
import gutil from 'gulp-util';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import addDevServerEntrypoints from 'webpack-dev-server/lib/util/addDevServerEntrypoints';

import webpackDevConfig from './config/webpack.dev.config.babel';


gulp.task('serve', function () {
  gutil.log('Webpack building.');
  addDevServerEntrypoints(webpackDevConfig, webpackDevConfig.devServer);
  let compilerConfig = webpack(webpackDevConfig);
  new WebpackDevServer(compilerConfig, webpackDevConfig.devServer)
    .listen(webpackDevConfig.devServer.port, webpackDevConfig.devServer.host, function (error) {
      if (error) {
        throw new gutil.PluginError('webpack', error);
      }
    });
});
