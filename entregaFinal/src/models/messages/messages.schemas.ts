import Joi from 'joi';
import mongoose from "mongoose";
import { MessageI } from './messages.interfaces';

export const MessageJoiSchema = (required: boolean) => {
  return Joi.object({
    user: required ? Joi.string().required() : Joi.string(),
    text: required ? Joi.string().required() : Joi.string(),
  });
}

export const MessagesSchema = new mongoose.Schema<MessageI>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    text: { type: String, required: true }
  },
  { versionKey: false, timestamps: true }
);
