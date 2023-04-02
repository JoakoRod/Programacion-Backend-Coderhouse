import Joi from 'joi';
import mongoose from "mongoose";
import { ProductI } from './products.interfaces';

export const ProductJoiSchema = (required: boolean) => {
  return Joi.object({
    nombre: required ? Joi.string().required() : Joi.string(),
    descripcion: Joi.string(),
    codigo: required ? Joi.number().required() : Joi.number(),
    foto: Joi.string(),
    precio: required ? Joi.number().required() : Joi.number(),
    stock: required ? Joi.number().required() : Joi.number(),
    categoria: Joi.string()
  });
}

export const Productschema = new mongoose.Schema<ProductI>(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
    },
    codigo: {
      type: Number,
      required: true,
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
    categoria: {
      type: String
    },
  },
  { versionKey: false }
);

