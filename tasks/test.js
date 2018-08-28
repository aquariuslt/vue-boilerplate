import gulp from 'gulp';
import sequence from 'gulp-sequence';
import jest from 'jest';

gulp.task('test:unit', function(done) {
  process.env.BABEL_ENV = 'test';
  const jestCliConfig = {
    coverage: true
  };
  jest.runCLI(jestCliConfig, ['.']).then(async () => {
    done();
  });
});

gulp.task('test:e2e', function() {

});

gulp.task('test:api', function() {

});

gulp.task('test', sequence(['test:unit'], ['test:e2e'], ['test:api']));

