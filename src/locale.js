import _ from 'lodash';
import Vue from 'vue';
import VueI18n from 'vue-i18n';


Vue.use(VueI18n);

let locale = new VueI18n({
  locale: 'zh',
  fallbackLocale: 'zh',
  messages: {}
});

function registerModule(moduleLocaleMessage) {
  let $this = this;
  let localeKeys = _.keys(moduleLocaleMessage);

  if (_.isFunction($this.mergeLocaleMessage)) {
    _.each(localeKeys, (localKey) => {
      $this.mergeLocaleMessage(localKey, moduleLocaleMessage[localKey]);
    });
  }
}

locale.registerModule = registerModule;

export default locale;
