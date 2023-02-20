import mongoose from 'mongoose';
import { Iproductos, productosSchema} from './productos';

export const carritosCollectionName = 'carritos';

export interface Icarritos {
  productos: Iproductos[]
}

export const carritosSchema = new mongoose.Schema<Icarritos>({
  productos: { type: [productosSchema], required: false },
});

export const carritosModel = mongoose.model<Icarritos>(carritosCollectionName, carritosSchema);