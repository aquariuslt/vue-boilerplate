import locale from '@/locale';

function loadAppConfig() {
  return Promise.resolve({
    title: locale.t('app.core.title')
  });
}

export default {
  loadAppConfig
};
