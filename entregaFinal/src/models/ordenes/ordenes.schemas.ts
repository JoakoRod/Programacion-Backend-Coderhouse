import Joi from 'joi';
import mongoose from "mongoose";
import { OrdenI } from './ordenes.interfaces';

export const OrdenJoiSchema = (required: boolean) => {
  return Joi.object({
    user: required ? Joi.string().required() : Joi.string(),
    items: required ? Joi.array().required() : Joi.array(),
    direccion: required ? Joi.string().required() : Joi.string(),
  });
}

export const OrdenesSchema = new mongoose.Schema<OrdenI>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true, unique: true },
    items: { type: [{ idProduct: { type: String, required: true, unique: true }, cantidad: Number }], required: true },
    direccion: { type: String, required: true }
  },
  { versionKey: false, timestamps: true }
);
