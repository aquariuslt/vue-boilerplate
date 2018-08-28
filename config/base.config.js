/* Created by Aquariuslt on 14/04/2017.*/
let baseConfig = {
  dir: {
    src: 'src',
    build: 'build',
    dist: {
      root: 'dist',
      js: 'static/js',
      css: 'static/css',
      img: 'static/img',
      manifest: 'static/manifest'
    },
    cache: '.cache',
    test: {
      unit: 'test/unit',
      e2e: 'test/e2e'
    },
    assets: [
      {
        from: 'src/assets',
        to: 'assets'
      }
    ]
  },
  file: {
    favicon: 'favicon.png'
  },
  dev: {
    host: '127.0.0.1',
    port: 5000
  }
};

export default baseConfig;
