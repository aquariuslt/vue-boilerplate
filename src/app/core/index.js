/* Created by Aquariuslt on 4/24/17.*/

import router from '../../router';
import coreRoutes from './routes/core.routes';

import store from '../../store';
import coreStore from './store/core.store';

router.addRoutes(coreRoutes);
store.registerModule('core', coreStore);
