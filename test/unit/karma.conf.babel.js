/** Created by CUIJA on 05-05-2017.*/
import webpackTestConf from '../../tasks/config/webpack.test.config.babel';

let karmaConfig = function (config) {
  config.set({
    browsers: [
      'PhantomJS'
    ],
    frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
    reporters: ['spec', 'coverage'],
    files: [
      './specs/**/*.spec.js'
    ],
    preprocessors: {
      './specs/**/*.spec.js': ['webpack', 'sourcemap']
    },
    webpack: webpackTestConf,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        {type: 'lcov', subdir: '.'},
        {type: 'text-summary'}
      ]
    }
  });
};

export default karmaConfig;

