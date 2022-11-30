import { Router } from 'express';
import { getAllProductos, getProductosBy_id, getProductoById, saveProducto, UptadeByid, DeleteByid } from '../controllers/productos';

const router = Router();


router.get('/:_id', getProductosBy_id);

router.get('/', getAllProductos);

router.get('/id/:id', getProductoById);

router.post('/', saveProducto);

router.put('/:id', UptadeByid);

router.delete('/:id', DeleteByid);

export default router