import { Router, Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { productosController } from '../controllers/productos';
import { typeProducto } from '../utils/types/types';

const router = Router();
const admin: boolean = true //VARIABLE 'GLOBAL'

function comprobarAdmin(admin: boolean, ruta: string, metodo: string) {
  if (!admin) throw createError(403, `ERROR: 403, descripcion: ruta '${ruta}' método '${metodo}' no autorizada`)
}

router.get('/', async (req: Request, res: Response) => {
  res.json(await productosController.getAll());
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: number = parseInt(req.params.id);
    res.json(await productosController.getById(id));

  } catch (error) {
    next(error);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    comprobarAdmin(admin, req.path, req.method)
    const producto: typeProducto = req.body;
    const id: number = await productosController.save(producto);

    res.json({
      msg: `Id asignado: ${id}`
    });

  } catch (error) {
    next(error);
  }
})

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    comprobarAdmin(admin, req.path, req.method)
    const id: number = parseInt(req.params.id);
    const product: typeProducto = req.body;
    await productosController.findByIdAndUptade(id, product);
    res.json({
      msg: 'Guardado Correctamente'
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    comprobarAdmin(admin, req.path, req.method)
    const id = parseInt(req.params.id);
    await productosController.findByIdAndDelete(id);
    res.json({
      msg: 'Producto eliminado exitosamente'
    });
  } catch (error) {
    next(error);
  }
});

export default router