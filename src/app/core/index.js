/* Created by Aquariuslt on 4/24/17.*/

import {router} from '../../router';
import coreRoutes from './core.routes';

import {store} from '../../store';
import coreStore from './core.store';

router.addRoutes(coreRoutes);
store.modules['core'] = coreStore;
