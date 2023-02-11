import Joi from 'joi';

export const ProductJoiSchema = Joi.object({
  nombre: Joi.string().required(),
  descripcion: Joi.string(),
  codigo: Joi.number().required(),
  foto: Joi.string(),
  precio: Joi.number().required(),
  stock: Joi.number().required(),
});