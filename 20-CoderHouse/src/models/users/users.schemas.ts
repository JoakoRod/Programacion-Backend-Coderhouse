import Joi from 'joi';

export const UsersJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  address: Joi.number(),
  age: Joi.number(),
  phone:Joi.string().required(),
  role: Joi.string().required()
});