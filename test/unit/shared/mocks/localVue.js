/**
 * Cause UnitTesting suppose not inject browsers current url
 * So Vue-Router, Vuex will be mock in setup using @vue/test-utils
 * @see https://@vue/test-utils.vuejs.org/en/guides/using-with-vue-router.html
 * */

import {createLocalVue} from '@vue/test-utils';

import VueMaterial from 'vue-material';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';

const localVue = createLocalVue();

localVue.use(VueMaterial);
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueI18n);

export default localVue;
