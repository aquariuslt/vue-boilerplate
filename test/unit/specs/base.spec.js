import Vue from 'vue';
import _ from 'lodash';

Vue.config.productionTip = false;

describe('base', () => {
  // unittest hello world
  it('# vue version should be 2.x', () => {
    expect(_.isEqual(Vue.version[0], '2')).to.eq(true);
  });
});
