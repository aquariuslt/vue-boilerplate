/* Created by Aquariuslt on 16/04/2017.*/
import gulp from 'gulp';
import sequence from 'gulp-sequence';

import {Server} from 'karma';

import baseConfig from './config/base.config';
import pathUtil from './util/path-util';


gulp.task('test', sequence(['test:unit'], ['test:e2e']));


gulp.task('test:unit', (done) => {
  process.env.BABEL_ENV = 'test';

  new Server({
    configFile: pathUtil.root(baseConfig.dir.test.unit) + '/' + baseConfig.file.karmaConf,
    singleRun: true
  }, done).start();


  done();
});

gulp.task('test:e2e', (done) => {
  done();
});
