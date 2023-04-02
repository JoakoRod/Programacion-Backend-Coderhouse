import mongoose from 'mongoose';
import Logger from '../../../services/logger';
import { ApiError, ErrorStatus } from '../../../services/error';
import { OrdenesSchema } from '../ordenes.schemas';
import {
  OrdenI,
  OrdenesDTO,
  OrdenQuery,
} from '../ordenes.interfaces';

export default class OrdenesMongoDAO {
  _schema = OrdenesSchema;
  _mensajes = mongoose.model('ordenes', this._schema);

  constructor() {
    Logger.info('Inicializamos DAO Carritos Mongo');
  }

  isValid(id: string): boolean {
    return mongoose.isValidObjectId(id);
  }

  async get(id?: string): Promise<CarritosDTO[] | CarritosDTO> {
    let output: CarritoI[] = [];

    if (id) {
      if (!this.isValid(id))
        throw new ApiError('Documento no existe', ErrorStatus.NotFound);
      const document = await this._mensajes.findById(id);
      if (document) return new CarritosDTO(document);
      else throw new ApiError('Documento no existe', ErrorStatus.NotFound);
    }
    output = await this._mensajes.find();
    return output.map((aMsg) => new CarritosDTO(aMsg));
  }

  async getOneByIdUser(id: string): Promise<CarritosDTO> {
    const document = await this._mensajes.findOne({user: id});
    if (document) return new CarritosDTO(document);
    else throw new ApiError('Documento no existe', ErrorStatus.NotFound);
  }

  async getPopulate(populate: string, id?: string): Promise<CarritosDTO[] | CarritosDTO> {
    if (id) {
      if (!this.isValid(id))
        throw new ApiError('Documento no existe', ErrorStatus.NotFound);
      const document: any = await this._mensajes.findById(id).populate(populate).lean();
      if (document) return document;
      else throw new ApiError('Documento no existe', ErrorStatus.NotFound);
    }
    const output = await this._mensajes.find().populate(populate, ['email', 'firstName', 'lastName', 'role' ]).lean();
    return output.map((aCarrito) => new CarritosDTO(aCarrito));
  }

  async getUser(userId: string, id?: string): Promise<CarritosDTO[] | CarritosDTO> {
    if (id) {
      if (!this.isValid(id))
        throw new ApiError('Documento no existe', ErrorStatus.NotFound);
      const document: any = await this._mensajes.findById(id, {user: userId}).lean();
      if (document) return document;
      else throw new ApiError('Documento no existe', ErrorStatus.NotFound);
    }
    const output = await this._mensajes.find({user: userId}).lean();
    return output.map((aCarrito) => new CarritosDTO(aCarrito));
  }
  
  async add(data: CarritoI): Promise<CarritosDTO> {
    const newCarrito = await this._mensajes.create(data);
    return new CarritosDTO(newCarrito);
  }

  async update(id: string, newCarritoData: CarritoI): Promise<CarritosDTO> {
    const result = await this._mensajes.findByIdAndUpdate(id, newCarritoData, {
      new: true,
    });
    if (!result)
      throw new ApiError('Documento no existe', ErrorStatus.NotFound);
    return new CarritosDTO(result);
  }

  async updateOneByIdUser(id: string, newCarritoData: CarritoI): Promise<CarritosDTO> {
    const document = await this._mensajes.findOneAndUpdate({user: id}, newCarritoData);
    if (document) return new CarritosDTO(document);
    else throw new ApiError('Documento no existe', ErrorStatus.NotFound);
  }

  async delete(id: string) {
    await this._mensajes.findByIdAndDelete(id);
  }

  async deleteOneByIdUser(id: string) {
    await this._mensajes.findOneAndDelete({user: id});
  }

  async query(options: CarritoQuery): Promise<CarritosDTO[]> {
    let query: CarritoQuery = {};

    if (options.user) query.user = options.user;
    if (options.updatedAt) query.updatedAt = options.updatedAt;
    if (options.direccion) query.direccion = options.direccion;

    const result = await this._mensajes.find(query);

    return result.map((aResult) => new CarritosDTO(aResult));
  }

}