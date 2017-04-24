/* Created by Aquariuslt on 4/11/17.*/
import Vue from 'vue';
import App from './app/App.vue';
import router from './router';
import store from './store';
import './app/core';
import './app/auth';

Vue.config.productionTip = false;


new Vue({
  el: '#app',
  store,
  router,
  template: '<app/>',
  components: {App}
});
