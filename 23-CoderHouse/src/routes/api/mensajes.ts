import Router from 'koa-router';
import messageController from '../../controllers/api/mensajes';

const router = new Router();


router.get('/', messageController.getMessage);

router.post('/', messageController.addMessage);

export default router.routes();