import mongoose from 'mongoose';
import { IProductos, productosSchema} from './productos';

export const carritosCollectionName = 'carritos';

export interface ICarritos {
  _id: number;
  productos: IProductos[]

}

const carritosSchema = new mongoose.Schema<ICarritos>({
  productos: { type: [productosSchema], required: false },
});

export const carritosModel = mongoose.model<ICarritos>(carritosCollectionName, carritosSchema);