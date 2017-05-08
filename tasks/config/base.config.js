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
    ]
  },
  file: {
    favicon: 'favicon.png'
  }
};

export default baseConfig;
