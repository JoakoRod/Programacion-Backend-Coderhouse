import { Router, Request, Response, NextFunction } from 'express';
import { fork } from 'child_process';
//import path from 'path';
import { listaRandom } from '../../controllers/randoms';

//const scriptPath = path.resolve(__dirname, '../../controllers/randoms.ts');
const router = Router();

router.get('/randoms', (req: Request, res: Response, next: NextFunction) => {
    //const arrayNums = fork(scriptPath);
    
    const cant = req.query.cant || 100; //100.000.000 es mucho
    const arrayNums = listaRandom(Number(cant));

    /* arrayNums.send({ msg: 'random', cant: cant });
    arrayNums.on('message', array => {
        res.json(array);
    }) */
    res.json(arrayNums);
})

export default router;