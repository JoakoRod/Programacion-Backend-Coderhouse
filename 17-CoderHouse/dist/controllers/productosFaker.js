"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductos = void 0;
const faker_1 = require("@faker-js/faker");
function generarProductos(cantidad) {
    const arrayProductos = [];
    for (let i = 0; i < cantidad; i++) {
        arrayProductos.push({
            nombre: faker_1.faker.commerce.product(),
            foto: faker_1.faker.image.cats(640, 480, true),
            precio: faker_1.faker.commerce.price()
        });
    }
    return arrayProductos;
}
function getProductos() {
    return generarProductos(5);
}
exports.getProductos = getProductos;
//# sourceMappingURL=productosFaker.js.map