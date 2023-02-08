import { faker } from '@faker-js/faker';
import { Request, Response, NextFunction } from 'express';

function generarProductos(cantidad: Number) {
    const arrayProductos = [];
    for (let i = 0; i < cantidad; i++) {
        arrayProductos.push({
            nombre: faker.commerce.product(),
            foto: faker.image.cats(640, 480, true),
            precio: faker.commerce.price()
        });
    }
    return arrayProductos;
}

function getProductos() {
    return generarProductos(5);
}


const load = async (req: Request | any, res: Response, next: NextFunction) => {
    const datos = {
        productos: getProductos(),
        mostrar: true,
        ruta: '/',
        mensajes: null //agregar
    };
    
    res.render('carga_vista_dev', datos);
};

export default {
    load
};