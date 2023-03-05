import Joi from 'joi';
import mongoose from 'mongoose';
import { MessageI } from './messages.interfaces';

export const MessageJoiSchema = Joi.object({
  user: Joi.string().required(),
  text: Joi.string().required()
});


const messagesSchema = new mongoose.Schema<MessageI>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    text: { type: String, required: true }
  },
  { versionKey: false, timestamps: true }
);

export const MessagesModel = mongoose.model<MessageI>('mensajes', messagesSchema);