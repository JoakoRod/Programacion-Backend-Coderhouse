export interface ProductI {
    _id?: String;
    nombre: String;
    descripcion: String;
    codigo: number;
    foto: String;
    precio: Number;
    stock: Number;
}

export interface ProductQuery {
    nombre?: String;
    precio?: Number;
    stock?: Number;
    codigo?: Number;
}

export interface ProductBaseClass {
    get(id?: String): Promise<ProductsDTO[] | ProductsDTO>;
    add(data: ProductI): Promise<ProductsDTO>;
    update(id: String, newProductData: ProductI): Promise<ProductsDTO>;
    delete(id: String): Promise<void>;
    query(options: ProductQuery): Promise<ProductsDTO[]>;
}

export class ProductsDTO {
    id: String;
    nombre: String;
    descripcion: String;
    codigo: Number;
    foto: String;
    precio: Number;
    hasStock: Boolean;
    stock: Number;

    constructor(data: ProductI) {
        this.nombre = data.nombre;
        this.descripcion = data.descripcion || '';
        this.codigo = data.codigo;
        this.foto = data.foto || '';
        this.precio = data.precio;
        this.hasStock = data.stock > 0;
        this.stock = data.stock;
        this.id = data._id || '';
    }
}
