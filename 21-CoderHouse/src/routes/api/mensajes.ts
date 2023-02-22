import { Router, Request, Response, NextFunction } from 'express';
import messageController from '../../controllers/api/mensajes';
import Handler from 'express-async-handler';

const router = Router();


router.get('/', Handler(messageController.getMessage));

router.post('/', Handler(messageController.addMessage));

export default router;