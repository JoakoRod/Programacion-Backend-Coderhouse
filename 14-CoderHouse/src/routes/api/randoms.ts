import { Router, Request, Response, NextFunction } from 'express';
const router = Router();

router.get('/randoms', (req: Request, res: Response, next: NextFunction) => {
    const cant = req.query.cant || 1000000; //100.000.000 es mucho
    const nums: number[] = [];
    for (let i = 0; i < cant; i++)
        nums.push(Math.floor(Math.random() * (1000 - 1 + 1) + 1));
    res.json(nums);
})

export default router;