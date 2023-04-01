import { Router } from 'express';
import messageController from '../../controllers/api/mensajes';
import { isLoggedIn } from '../../middlewares/auth';
import Handler from 'express-async-handler';

const router = Router();


router.get('/', isLoggedIn, Handler(messageController.getMessage));

router.post('/', isLoggedIn, Handler(messageController.addMessage));

router.get('/populate', isLoggedIn, Handler(messageController.getMessageByUser));

router.get('/mios', isLoggedIn, Handler(messageController.getMessagesUsuario));

router.get('/:email', isLoggedIn, Handler(messageController.getMessageByEmail));

router.put('/:id', isLoggedIn, Handler(messageController.putMessage));

router.delete('/:id', isLoggedIn, Handler(messageController.deleteMessage));

export default router;