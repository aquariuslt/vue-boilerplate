/* Created by Aquariuslt on 15/04/2017.*/
import gulp from 'gulp';
import rimraf from 'gulp-rimraf';

import logger from './util/logger';

import prodConfig from './config/prod.config';

gulp.task('clean', function () {
  logger.info('Deleting dist folder');
  return gulp.src(prodConfig.dist)
    .pipe(rimraf());
});
