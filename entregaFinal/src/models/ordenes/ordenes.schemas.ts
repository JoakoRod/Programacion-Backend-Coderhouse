import Joi from 'joi';
import mongoose from "mongoose";
import { OrdenI } from './ordenes.interfaces';
import { Productschema } from '../products/products.schemas';

export const OrdenJoiSchema = (required: boolean) => {
  return Joi.object({
    userEmail: required ? Joi.string().required() : Joi.string(),
    items: required ? Joi.array().required() : Joi.array(),
    estado: Joi.string(),
    numero: required ? Joi.number().required() : Joi.number(),
  });
}

const OrdenesSchema = new mongoose.Schema<OrdenI>(
  {
    userEmail: { type: String, ref: 'users', required: true },
    items: { type: [{ producto: Object, cantidad: Number }], required: true },
    numero: { type: Number, required: true },
    estado: { type: String, default: 'generada' }
  },
  { versionKey: false, timestamps: true }
);

export { OrdenesSchema };