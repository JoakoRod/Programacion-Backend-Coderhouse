import mongoose from 'mongoose';

export const productosCollectionName = 'productos';

export interface IProductos {
    id: number
    nombre: string;
    descripcion: string;
    codigo: number;
    foto: string;
    precio: number;
    stock: number;
}

export const productosSchema = new mongoose.Schema<IProductos>({
    id: { type: Number, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: false },
    codigo: { type: Number, required: true },
    foto: { type: String, required: false },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true }
}, {
    timestamps: true
});

export const productosModel = mongoose.model<IProductos>(productosCollectionName, productosSchema);