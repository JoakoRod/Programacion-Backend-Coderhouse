import { Router } from 'express';
import { getProductsByIdDeCarrito, createCarrito, agregarProductoById, DeleteCarritoById, DeleteProductoById } from '../controllers/carritos';

const router = Router();

router.post('/', createCarrito);

router.delete('/:id', DeleteCarritoById);

router.get('/:id/productos', getProductsByIdDeCarrito);

router.post('/:id/productos', agregarProductoById);

router.delete('/:id/productos/:id_prod', DeleteProductoById);

export default router;