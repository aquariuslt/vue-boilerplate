/* Created by Aquariuslt on 4/11/17.*/

import * as path from 'path';

const _root = path.resolve(__dirname, '../..');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join(...[_root].concat(args));
}

function resolve(dir) {
  return path.join(__dirname, '../..', dir);
}

export default {
  root,
  resolve
};
