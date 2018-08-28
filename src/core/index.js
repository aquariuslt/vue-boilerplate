/* Created by Aquariuslt on 4/24/17.*/

import router from '@/router';
import store from '@/store';

import coreRoutes from './routes/index';
import coreStore from './store/index';

router.addRoutes(coreRoutes);
store.registerModule('core', coreStore);
