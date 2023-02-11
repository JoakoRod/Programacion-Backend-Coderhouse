import { Router } from 'express';
import { devController } from '../../controllers';
import Handler from 'express-async-handler';
/* import { getWsServer } from '../../services/socket' */
const router = Router();

router.get('/', Handler(devController.load));

export default router;