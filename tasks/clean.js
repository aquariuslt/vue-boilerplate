/* Created by Aquariuslt on 15/04/2017.*/
import gulp from 'gulp';
import rimraf from 'gulp-rimraf';
import sequence from 'gulp-sequence';

import logger from './util/logger';

import baseConfig from './config/base.config';

gulp.task('clean', sequence(['clean:build', 'clean:cache', 'clean:dist']));


gulp.task('clean:build', () => {
  logger.info('Deleting build folder');
  return gulp.src(baseConfig.dir.build)
    .pipe(rimraf());
});

gulp.task('clean:cache', () => {
  logger.info('Deleting cache folder');
  return gulp.src(baseConfig.dir.cache)
    .pipe(rimraf());
});

gulp.task('clean:dist', () => {
  logger.info('Deleting dist folder');
  return gulp.src(baseConfig.dir.dist)
    .pipe(rimraf());
});
