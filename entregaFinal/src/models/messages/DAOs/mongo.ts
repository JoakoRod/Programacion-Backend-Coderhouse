import mongoose from 'mongoose';
import Logger from '../../../services/logger';
import { ApiError, ErrorStatus } from '../../../services/error';
import { MessagesSchema } from '../messages.schemas';
import {
  MessageI,
  MessagesDTO,
  MessageQuery,
} from '../messages.interfaces';

export default class ProductosMongoDAO {
  _schema = MessagesSchema;
  _mensajes = mongoose.model('mensajes', this._schema);

  constructor() {
    Logger.info('Inicializamos DAO messages Mongo');
  }

  isValid(id: string): boolean {
    return mongoose.isValidObjectId(id);
  }

  async get(id?: string): Promise<MessagesDTO[] | MessagesDTO> {
    let output: MessageI[] = [];

    if (id) {
      if (!this.isValid(id))
        throw new ApiError('Documento no existe', ErrorStatus.NotFound);
      const document = await this._mensajes.findById(id);
      if (document) return new MessagesDTO(document);
      else throw new ApiError('Documento no existe', ErrorStatus.NotFound);
    }
    output = await this._mensajes.find();
    return output.map((aMsg) => new MessagesDTO(aMsg));
  }

  async getPopulate(populate: string, id?: string): Promise<MessagesDTO[] | MessagesDTO> {
    if (id) {
      if (!this.isValid(id))
        throw new ApiError('Documento no existe', ErrorStatus.NotFound);
      const document: any = await this._mensajes.findById(id).populate(populate);
      if (document) return document;
      else throw new ApiError('Documento no existe', ErrorStatus.NotFound);
    }
    const output = await this._mensajes.find().populate(populate);
    return output.map((aMessage) => new MessagesDTO(aMessage));
  }

  async add(data: MessageI): Promise<MessagesDTO> {
    const newMessage = await this._mensajes.create(data);
    return new MessagesDTO(newMessage);
  }

  async update(id: string, newMessageData: MessageI): Promise<MessagesDTO> {
    const result = await this._mensajes.findByIdAndUpdate(id, newMessageData, {
      new: true,
    });
    if (!result)
      throw new ApiError('Documento no existe', ErrorStatus.NotFound);
    return new MessagesDTO(result);
  }

  async delete(id: string) {
    await this._mensajes.findByIdAndDelete(id);
  }

  async query(options: MessageQuery): Promise<MessagesDTO[]> {
    let query: MessageQuery = {};

    if (options.user) query.user = options.user;

    if (options.text) query.text = options.text;

    const result = await this._mensajes.find(query);

    return result.map((aResult) => new MessagesDTO(aResult));
  }

  async validate(email: string, phone: string): Promise<MessagesDTO[]> {

    const result = await this._mensajes.find({ $or: [{ email: email }, { phone: phone }] });
    const result2 = result.map((aResult) => new MessagesDTO(aResult));
    return result2
  }
}