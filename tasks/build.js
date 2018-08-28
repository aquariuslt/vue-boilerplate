/* Created by Aquariuslt on 15/04/2017.*/
import gulp from 'gulp';
import log from 'fancy-log';
import sequence from 'gulp-sequence';

import webpack from 'webpack';
import webpackProdConfig from '../config/webpack.prod.babel';

import './clean';

gulp.task('webpack', function(done) {
  log.info('Webpack building.');
  webpack(webpackProdConfig, function(error, stats) {
    if (error || stats.hasErrors()) {
      log.error('Webpack build error:', error);
    }
    log.info(stats.toString(webpackProdConfig.stats));
    log.info('Webpack build done');
    done();
  });
});

gulp.task('build', sequence(['clean'], ['webpack']));


