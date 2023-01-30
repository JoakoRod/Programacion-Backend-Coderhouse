import mongoose from 'mongoose';

export const productosCollectionName = 'productos';

export interface Iproductos {
    nombre: String
    descripcion: String
    codigo: Number
    foto: String
    precio: Number
    stock: Number
};

export const productosSchema = new mongoose.Schema<Iproductos>({
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    descripcion: {
        type: String,
    },
    codigo: {
        type: Number,
        required: true,
        unique: true,
    },
    foto: {
        type: String,
    },
    precio: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});

export const productosModel = mongoose.model<Iproductos>(productosCollectionName, productosSchema);