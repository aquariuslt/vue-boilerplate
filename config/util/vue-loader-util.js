/** Created by CUIJA on 04-17-2017.*/
import _ from 'lodash';

import ExtractTextPlugin from 'extract-text-webpack-plugin';

/*
 * @param {Object} options
 * Build Vue Loader with options
 * From base example in vue-loader if you only
 * use pure-css as style in .vue file
 * like
 * {
 *   test: /\.vue/,
 *   loader: 'vue-loader',
 *   options:{
 *      loaders:{
 *         'css':[
 *            'vue-style-loader',
 *            {
 *              'loader': 'css-loader',
 *              'options': {
 *                'minimize': false,
 *                'sourceMap': true
 *              }
 *            }
 *         ]
 *      }
 *   }
 * }
 *
 * this method provide a factory-like builder for generating
 * styles loaders by options
 * @see https://github.com/vuejs/vue-loader
 *
 * */
function buildVueStylesLoader(options) {
  options = options || {};

  return {
    loaders: {
      css: generateStylesLoader(null, options),
      postcss: generateStylesLoader(null, options),
      less: generateStylesLoader('less', options),
      styl: generateStylesLoader('stylus', options)
    }
  };
}

/*
 * @param {String} loaderNamePrefix like css,less,sass,scss,stylus ...
 * @param {Object} loaderOptions including 3 boolean properties: sourceMap,extract,minimize
 * @param {Object} extraOptions
 * */
function generateStylesLoader(loaderNamePrefix, loaderOptions, extraOptions) {
  let { sourceMap, extract, minimize } = loaderOptions;
  sourceMap = _.isUndefined(sourceMap) ? true : sourceMap;
  extract = _.isUndefined(extract) ? false : extract;
  minimize = _.isUndefined(sourceMap) ? false : minimize;

  // use cssLoader as each style loader fallback
  let cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: minimize,
      sourceMap: sourceMap
    }
  };

  let loaders = [cssLoader];

  if (!_.isEmpty(loaderNamePrefix)) {
    let currentLoader = {
      loader: loaderNamePrefix + '-loader',
      options: {
        sourceMap: sourceMap,
        minimize: minimize
      }
    };

    // special handle for sass
    if (!_.isUndefined(extraOptions)) {
      currentLoader.options = _.assign(currentLoader.options, extraOptions);
    }

    loaders.push(currentLoader);
  }

  if (extract) {
    return ExtractTextPlugin.extract({
      use: loaders,
      fallback: 'vue-style-loader'
    });
  } else {
    return ['vue-style-loader'].concat(loaders);
  }
}

export default {
  buildVueStylesLoader
};
