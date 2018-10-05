/* Created by Aquariuslt on 4/24/17.*/

import router from '@/router';
import store from '@/store';
import locale from '@/locale';

import coreRoutes from './routes';
import coreStore from './store';
import coreI18n from './i18n';

import types from './store/mutation-types';

router.addRoutes(coreRoutes);
store.registerModule('core', coreStore);
locale.registerModule(coreI18n);

store.dispatch(types.LOAD_APP_CONFIG).then();
