/* Created by Aquariuslt on 14/04/2017.*/
let baseConfig = {
  dir: {
    src: 'src',
    build: 'build',
    dist: 'dist',
    cache: '.cache',
    assets: [
      {
        from: 'src/assets',
        to: 'assets'
      }
    ],
    test: {
      unit: 'test/unit',
      e2e: 'test/e2e'
    }
  },
  file: {
    favicon: 'favicon.png',
    karmaConf: 'karma.conf.babel.js',
    nightWatch: 'nightwatch.json'

  }
};

export default baseConfig;
