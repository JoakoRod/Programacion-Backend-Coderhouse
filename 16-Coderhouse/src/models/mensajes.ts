import mongoose from 'mongoose';

export const mensajesCollectionName = 'mensajes';

export interface Imensajes {
    author: {
        id: string, //correo
        nombre: string,
        apellido: string,
        edad: number,
        alias: string,
        avatar: string
    },
    text: string
};

export const mensajesSchema = new mongoose.Schema<Imensajes>({
    author: {
        id: { type: String, required: true },
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        edad: { type: Number, required: true },
        alias: { type: String, required: true },
        avatar: { type: String, required: true }
    },
    text: { type: String, required: true }
}, {
    timestamps: true
});

export const mensajesModel = mongoose.model<Imensajes>(mensajesCollectionName, mensajesSchema);