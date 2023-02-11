import Joi from 'joi';

export const MessageJoiSchema = Joi.object({
  user: Joi.string().required(),
  text: Joi.string().required()
});