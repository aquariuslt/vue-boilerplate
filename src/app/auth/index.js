/* Created by Aquariuslt on 4/24/17.*/
import {router} from '../../router';
import authRoutes from './auth.routes';

import {store} from '../../store';
import authStore from './auth.store';

router.addRoutes(authRoutes);
store.modules['auth'] = authStore;
