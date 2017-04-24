/* Created by Aquariuslt on 4/24/17.*/
import router from '../../router';
import authRoutes from './routes/auth.routes';

import store from '../../store';
import authStore from './store/auth.store';

router.addRoutes(authRoutes);
store.registerModule('auth', authStore);
