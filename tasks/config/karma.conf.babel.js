/** Created by CUIJA on 05-05-2017.*/
import webpackTestConf from './webpack.test.config.babel';
import puppeteerPkg from 'puppeteer/package.json';
import Downloader from 'puppeteer/utils/ChromiumDownloader';
import pathUtil from '../util/path-util';

const ChromiumRevision = puppeteerPkg['puppeteer']['chromium_revision'];
let revisionInfo = Downloader.revisionInfo(Downloader.currentPlatform(), ChromiumRevision);
process.env.CHROMIUM_BIN = revisionInfo.executablePath;

let karmaConfig = function(config) {
  config.set({
    browsers: [
      'ChromiumHeadless'
    ],
    frameworks: [
      'mocha',
      'chai',
      'sinon'
    ],
    files: [
      pathUtil.resolve('test/unit/specs') + '/**/*.spec.js'
    ],
    reporters: [
      'spec',
      'coverage-istanbul'
    ],
    preprocessors: {
      '/**/*.spec.js': ['webpack', 'sourcemap']
    },
    webpack: webpackTestConf,
    webpackMiddleware: {
      noInfo: true
    },
    coverageIstanbulReporter: {
      dir: pathUtil.resolve('test/unit') + '/coverage',
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: true,
      thresholds: {
        emitWarning: false,
        global: {
          statements: 0,
          lines: 1,
          branches: 0,
          functions: 0
        }
      }
    }
  });
};

export default karmaConfig;

