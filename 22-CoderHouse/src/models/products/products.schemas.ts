import Joi from 'joi';
import mongoose from 'mongoose';
import { ProductI } from './products.interfaces';

export const ProductJoiSchema = Joi.object({
  nombre: Joi.string().required(),
  descripcion: Joi.string(),
  codigo: Joi.number().required(),
  foto: Joi.string(),
  precio: Joi.number().required(),
  stock: Joi.number().required(),
});


const Productschema = new mongoose.Schema<ProductI>(
  {
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
  },
  { versionKey: false }
);


export const ProductsModel = mongoose.model<ProductI>('productos', Productschema);