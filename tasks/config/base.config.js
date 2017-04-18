/* Created by Aquariuslt on 14/04/2017.*/
let baseConfig = {
  src: 'src',
  dist: 'dist',
  // assets folder will be copied into dist folder
  assets: [
    {
      from: 'src/assets',
      to: 'assets'
    }
  ],
  // if you use favicon.ico or other filename under /src please update here
  favicon: 'favicon.png'
};

export default baseConfig;
