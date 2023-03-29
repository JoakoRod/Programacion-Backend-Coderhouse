export interface ProductI {
    _id?: string;
    nombre: string;
    descripcion: string;
    codigo: number;
    foto: string;
    precio: number;
    stock: number;
    categoria: string
}

export interface ProductQuery {
    nombre?: string;
    precio?: number;
    stock?: number;
    codigo?: number;
    categoria?: string;
}

export interface ProductBaseClass {
    get(id?: string): Promise<ProductsDTO[] | ProductsDTO>;
    add(data: ProductI): Promise<ProductsDTO>;
    update(id: string, newProductData: ProductI): Promise<ProductsDTO>;
    delete(id: string): Promise<void>;
    query(options: ProductQuery): Promise<ProductsDTO[]>;
}

export class ProductsDTO {
    id: string;
    nombre: string;
    descripcion: string;
    codigo: number;
    foto: string;
    precio: number;
    hasStock: boolean;
    stock: number;

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
