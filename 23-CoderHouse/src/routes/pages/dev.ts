import Router from 'koa-router';
import { devController } from '../../controllers';
/* import { getWsServer } from '../../services/socket' */
const router = new Router();

router.get('/', devController.load);

export default router.routes();