import coreApi from '@/core/api/core.api';
import types from './mutation-types';

import menuUtil from '../utils/menu-util';

export default {
  [types.LOAD_APP_CONFIG]({ commit }) {
    coreApi.loadAppConfig().then((appConfig) => {
      commit(types.LOAD_APP_CONFIG, appConfig);
    });
  },
  [types.REGISTER_NAV_MENUS]({ commit, dispatch }, menus) {
    commit(types.REGISTER_NAV_MENUS, menus);
  }
};
