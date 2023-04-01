import Joi from 'joi';
import mongoose from "mongoose";
import { UserI } from "./users.interfaces";
import bcrypt from 'bcrypt'

export const UsersJoiSchema = (required: boolean) => {
  return Joi.object({
    email: required ? Joi.string().required() : Joi.string(),
    password: required ? Joi.string().required() : Joi.string(),
    firstName: required ? Joi.string().required() : Joi.string(),
    lastName: required ? Joi.string().required() : Joi.string(),
    address: Joi.string(),
    age: Joi.number(),
    phone: required ? Joi.string().required() : Joi.string(),
    role: required ? Joi.string().required() : Joi.string()
  });
}

const Userschema = new mongoose.Schema<UserI>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      require: true
    },
    phone: {
      type: String,
      require: true
    },
    role: {
      type: String,
      default: 'user'
    }
  },
  { versionKey: false }
);

Userschema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);

  this.password = hash;
  next();
});

export { Userschema }