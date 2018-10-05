import types from './mutation-types';

export default {
  [types.LOAD_APP_CONFIG](state, appConfig) {
    state.app = appConfig;
  },
  [types.REGISTER_NAV_MENUS](state, menus) {
    state.menus = state.menus.concat(menus);
  }
};
