import Joi from 'joi';
import mongoose from "mongoose";
import { CarritoI } from './carritos.interfaces';

export const CarritoJoiSchema = (required: boolean) => {
  return Joi.object({
    user: required ? Joi.string().required() : Joi.string(),
    items: required ? Joi.array().required() : Joi.array(),
    direccion: required ? Joi.string().required() : Joi.string(),
  });
} 

export const CarritosSchema = new mongoose.Schema<CarritoI>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    items: { type: mongoose.Schema.Types.Array, required: true },
    direccion: { type: String, required: true }
  },
  { versionKey: false, timestamps: true }
);
