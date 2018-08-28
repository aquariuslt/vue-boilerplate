import path from 'path';

function resolve(dir) {
  return path.join(__dirname, '../..', dir);
}

export default {
  resolve
};
