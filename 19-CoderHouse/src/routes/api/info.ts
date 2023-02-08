import { Router} from 'express';
import { infoController } from '../../controllers';
const router = Router();

router.get('/', infoController.info)

export default router;