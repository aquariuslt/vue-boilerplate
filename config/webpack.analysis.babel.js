import merge from 'webpack-merge';

import BundleAnalyzerPlugin from 'webpack-bundle-analyzer/lib/BundleAnalyzerPlugin';

import webpackProdConfig from './webpack.prod.babel';

let webpackAnalysisConfig = merge(webpackProdConfig, {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
});

export default webpackAnalysisConfig;

