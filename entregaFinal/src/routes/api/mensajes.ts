import { Router } from 'express';
import messageController from '../../controllers/api/mensajes';
import { isAdmin, isLoggedIn } from '../../middlewares/auth';
import Handler from 'express-async-handler';

const router = Router();


router.get('/', isLoggedIn, Handler(messageController.getMessage));

router.post('/', isLoggedIn, Handler(messageController.addMessage));

router.get('/populate', isLoggedIn, Handler(messageController.getMessageByUser));

router.get('/mios', isLoggedIn, Handler(messageController.getMessagesUsuario));

router.get('/:email', isLoggedIn, Handler(messageController.getMessageByEmail));

router.put('/:id', isAdmin, Handler(messageController.putMessage));

router.delete('/:id', isAdmin, Handler(messageController.deleteMessage));

export default router;