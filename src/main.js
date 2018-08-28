/* Created by Aquariuslt on 4/11/17.*/
import './styles.less';

import Vue from 'vue';
import VueMaterial from 'vue-material';
import router from './router';
import store from './store';

import './app/core';
import './offline';

import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(VueMaterial);

new Vue({
  el: '#app',
  store,
  router,
  template: '<app/>',
  components: { App }
});

console.log('init vue complete');
