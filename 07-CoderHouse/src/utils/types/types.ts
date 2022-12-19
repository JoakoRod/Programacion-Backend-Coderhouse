type typeProducto = {
    id: number;
    timestamp: number;
    nombre: string
    descripcion: string
    codigo: number
    foto: string
    precio: number
    stock: number
};

type typeCarrito = {
    id: number;
    timestamp: number;
    productos: typeProducto[]
};

export { typeProducto, typeCarrito }