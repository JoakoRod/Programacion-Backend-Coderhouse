import Router from 'koa-router';
import { infoController } from '../../controllers';
const router = new Router();

router.get('/', infoController.info)

export default router.routes();