import { Router, Request, Response, NextFunction } from 'express';
import { carritoController } from '../controllers/carrito';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idAsignado: number = await carritoController.create();
        res.json({
            msg: `Carrito creado correctamente, el id del carrito es: ${idAsignado}`
        });
    } catch (error) {
        next(error);
    }
})

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = parseInt(req.params.id);
        await carritoController.findByIdAndDelete(id);
        res.json({
            msg: 'Carrito Eliminado'
        });
    } catch (error) {
        next(error);
    }
})

router.get('/:id/productos', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = parseInt(req.params.id);
        res.json(await carritoController.getProductsById(id));
    } catch (error) {
        next(error);
    }
})

router.post('/:id/productos', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = parseInt(req.params.id);
        const idProd: number = req.body.id;
        await carritoController.addProductById(id, idProd);
        res.json({
            msg: 'Producto añadido con exito!'
        });
    } catch (error) {
        next(error);
    }
})

router.delete('/:id/productos/:id_prod', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = parseInt(req.params.id);
        const idProd: number = parseInt(req.params.id_prod);
        await carritoController.deleteProductById(id, idProd);
        res.json({
            msg: 'Producto eliminado correctamente!'
        });
    } catch (error) {
        next(error);
    }
})

export default router;