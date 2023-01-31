import { getWsServer } from '../../services/socket'
import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
const io = getWsServer();

router.post('/', (req: Request | any, res: Response, next: NextFunction) => {
    io.sockets.emit()
})

export default router;