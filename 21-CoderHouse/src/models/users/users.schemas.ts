import Joi from 'joi';
import mongoose from "mongoose";
import { UserI } from "./users.interfaces";
import bcrypt from 'bcrypt'

export const UsersJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  address: Joi.number(),
  age: Joi.number(),
  phone: Joi.string().required(),
  role: Joi.string().required()
});

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

export const UsersModel = mongoose.model<UserI>('users', Userschema);