import mongoose from 'mongoose';
import { IProductos, productosSchema} from './productos';

export const carritosCollectionName = 'carritos';

export interface ICarritos {
  id: number;
  productos: IProductos[]

}

const carritosSchema = new mongoose.Schema<ICarritos>({
  id: { type: Number, required: true },
  productos: { type: [productosSchema], required: false },
});

export const CategoryModel = mongoose.model<ICarritos>(carritosCollectionName, carritosSchema);