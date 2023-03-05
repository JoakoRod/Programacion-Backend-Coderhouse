import { Router, Request, Response, NextFunction } from 'express';
import { mandarWspARemitente} from '../../services/twilio';

const router = Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    //let message = req.body.body;
    let senderID = req.body.From;

    mandarWspARemitente('mensaje de prueba', senderID);
})

export default router;