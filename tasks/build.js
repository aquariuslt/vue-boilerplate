/* Created by Aquariuslt on 15/04/2017.*/
import gulp from 'gulp';
import gutil from 'gulp-util';
import sequence from 'gulp-sequence';

import webpack from 'webpack';
import webpackProdConfig from './config/webpack.prod.config.babel';

import './clean';


gulp.task('webpack', function (done) {
  gutil.log('Webpack building.');
  webpack(webpackProdConfig, function (error, stats) {
    if (error) {
      throw new gutil.PluginError('webpack', error);
    }
    gutil.log(stats.toString(webpackProdConfig.stats));
    gutil.log('Webpack build done');
    done();
  });
});


gulp.task('build', sequence(['clean'], ['webpack']));


