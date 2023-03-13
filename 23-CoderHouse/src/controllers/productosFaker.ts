import { faker } from '@faker-js/faker';
import { Context, Next } from 'koa';

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


const load = async (ctx: Context | any, next: Next) => {
    const datos = {
        productos: getProductos(),
        mostrar: true,
        ruta: '/',
        mensajes: null //agregar
    };
    
    ctx.render('carga_vista_dev', datos);
};

export default {
    load
};