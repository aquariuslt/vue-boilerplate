/* Created by Aquariuslt on 4/11/17.*/
import Vue from 'vue';
import VueMaterial from 'vue-material';
import router from './router';
import store from './store';
import './app/core';
import './app/auth';

import App from './app/App.vue';

Vue.config.productionTip = false;
Vue.use(VueMaterial);

new Vue({
  el: '#app',
  store,
  router,
  template: '<app/>',
  components: {App}
});
