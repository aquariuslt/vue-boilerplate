/* Created by Aquariuslt on 4/11/17.*/


let baseWebpackConfig = {
  entry: {
    main: './src/main.js',
    vendor: './src/vendor.js',
    styles: './src/style.css'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
};


export default baseWebpackConfig;
