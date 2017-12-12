import Vue from 'vue';
import VueMaterial from 'vue-material';
import _ from 'lodash';

Vue.config.productionTip = false;
Vue.use(VueMaterial);

import Login from '@/app/auth/layouts/Login';

describe('base', () => {
  // unittest hello world
  it('# vue version should be 2.x', () => {
    expect(_.isEqual(Vue.version[0], '2')).to.eq(true);
  });

  describe('login component', () => {
    before('mount on body', () => {
      new Vue(Login).$mount();
    });

    it('# vuex store should be initial', () => {

    });
  });
});
