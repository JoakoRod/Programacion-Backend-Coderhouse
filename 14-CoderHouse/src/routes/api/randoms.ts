import { Router, Request, Response, NextFunction } from 'express';
import { fork } from 'child_process';
import path from 'path';

const scriptPath = path.resolve(__dirname, '../../controllers/randoms.ts');
const router = Router();

router.get('/randoms', (req: Request, res: Response, next: NextFunction) => {
    const arrayNums = fork(scriptPath);
    const cant = req.query.cant || 1000000; //100.000.000 es mucho

    arrayNums.send({msg: 'random', cant: cant});
    arrayNums.on('message', array => {
        res.json(array);
    })
})

export default router;