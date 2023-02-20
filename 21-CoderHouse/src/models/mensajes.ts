import mongoose from 'mongoose';

export const mensajesCollectionName = 'mensajes';

export interface Imensajes {
    user: mongoose.Schema.Types.ObjectId | String,
    text: string
};

export const mensajesSchema = new mongoose.Schema<Imensajes>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    text: { type: String, required: true }
}, {
    timestamps: true
});

export const mensajesModel = mongoose.model<Imensajes>(mensajesCollectionName, mensajesSchema);