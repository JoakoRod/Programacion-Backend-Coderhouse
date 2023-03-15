import { Router, Request, Response } from 'npm:express';

const router = Router();

router.get('/', (req: Request, res: Response)=>{
    res.send('')
});

router.post('/', (req: Request, res: Response)=>{
    console.log(req.body);
});

export default router;