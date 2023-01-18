import { faker } from '@faker-js/faker';

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

export function getProductos() {
    return generarProductos(5);
}