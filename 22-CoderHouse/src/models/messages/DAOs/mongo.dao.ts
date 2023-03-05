import mongoose from 'mongoose';
import { MongoDBClient } from '../../../services/database';
import {
  MessageI,
  MessagesDTO,
  MessageBaseClass,
  MessageQuery,
} from '../messages.interfaces';
import createError from 'http-errors';
import { MessagesModel } from '../messages.schemas'

export default class MessageDao implements MessageBaseClass {
  private static instance: MessageDao;
  private static client: MongoDBClient;
  private messages = MessagesModel;

  static async getInstance(local: boolean = false) {
    if (!MessageDao.instance) {
      MessageDao.instance = new MessageDao();
      await MongoDBClient.getConnection(local);
      MessageDao.client = await MongoDBClient.getConnection();
    }
    return MessageDao.instance;
  }

  isValid(id: string): boolean {
    return MessageDao.client.isValidId(id);
  }

  async get(id?: string): Promise<MessagesDTO[] | MessagesDTO> {
    let output: MessageI[] = [];

    if (id) {
      if (!this.isValid(id)) {
        throw createError(500, `error con la db, el documento no existe`)
      }
      const document = await this.messages.findById(id);
      if (document) return new MessagesDTO(document);
      else throw createError(500, `error con la db, el documento no existe`)
    }
    output = await this.messages.find();
    return output.map((aMessage) => new MessagesDTO(aMessage));
  }

  async getPopulate(populate: string, id?: string): Promise<MessagesDTO[] | MessagesDTO> {
    if (id) {
      if (!this.isValid(id))
        throw createError(500, `error con la db, el documento no existe`)
      const document: any = await this.messages.findById(id).populate(populate);
      if (document) return document;
      else throw createError(500, `error con la db, el documento no existe`)
    }
    const output = await this.messages.find().populate(populate);
    return output.map((aMessage) => new MessagesDTO(aMessage));
  }

  async add(data: MessageI): Promise<MessagesDTO> {
    const newMessage = await this.messages.create(data);
    return new MessagesDTO(newMessage);
  }

  async update(id: string, newMessageData: MessageI): Promise<MessagesDTO> {
    const result = await this.messages.findByIdAndUpdate(id, newMessageData, {
      new: true,
    });
    if (!result)
      throw createError(500, `error con la db, el documento no existe`)
    return new MessagesDTO(result);
  }

  async delete(id: string) {
    await this.messages.findByIdAndDelete(id);
  }

  async query(options: MessageQuery): Promise<MessagesDTO[]> {
    let query: MessageQuery = {};

    if (options.user) query.user = options.user;

    if (options.text) query.text = options.text;

    const result = await this.messages.find(query);

    return result.map((aResult) => new MessagesDTO(aResult));
  }
}
