/* Created by Aquariuslt on 15/04/2017.*/
import gulp from 'gulp';
import log from 'fancy-log';
import rimraf from 'gulp-rimraf';
import sequence from 'gulp-sequence';


import baseConfig from '../config/base.config';

gulp.task('clean', sequence(['clean:build', 'clean:cache', 'clean:dist']));


gulp.task('clean:build', () => {
  log.info('Deleting build folder');
  return gulp.src(baseConfig.dir.build)
    .pipe(rimraf());
});

gulp.task('clean:cache', () => {
  log.info('Deleting cache folder');
  return gulp.src(baseConfig.dir.cache)
    .pipe(rimraf());
});

gulp.task('clean:dist', () => {
  log.info('Deleting dist folder');
  return gulp.src(baseConfig.dir.dist)
    .pipe(rimraf());
});
