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
    Logger.info('Inicializamos DAO Ordenes Mongo');
  }

  isValid(id: string): boolean {
    return mongoose.isValidObjectId(id);
  }

  async get(id?: string): Promise<OrdenesDTO[] | OrdenesDTO> {
    let output: OrdenI[] = [];

    if (id) {
      if (!this.isValid(id))
        throw new ApiError('Documento no existe', ErrorStatus.NotFound);
      const document = await this._mensajes.findById(id);
      if (document) return new OrdenesDTO(document);
      else throw new ApiError('Documento no existe', ErrorStatus.NotFound);
    }
    output = await this._mensajes.find();
    return output.map((aMsg) => new OrdenesDTO(aMsg));
  }

  async getPopulate(populate: string, id?: string): Promise<OrdenesDTO[] | OrdenesDTO> {
    if (id) {
      if (!this.isValid(id))
        throw new ApiError('Documento no existe', ErrorStatus.NotFound);
      const document: any = await this._mensajes.findById(id).populate(populate).lean();
      if (document) return document;
      else throw new ApiError('Documento no existe', ErrorStatus.NotFound);
    }
    const output = await this._mensajes.find().populate(populate, ['email', 'firstName', 'lastName', 'role' ]).lean();
    return output.map((aOrden) => new OrdenesDTO(aOrden));
  }

  async add(data: OrdenI): Promise<OrdenesDTO> {
    const newOrden = await this._mensajes.create(data);
    return new OrdenesDTO(newOrden);
  }

  async update(id: string, newOrdenData: OrdenI): Promise<OrdenesDTO> {
    const result = await this._mensajes.findByIdAndUpdate(id, newOrdenData, {
      new: true,
    });
    if (!result)
      throw new ApiError('Documento no existe', ErrorStatus.NotFound);
    return new OrdenesDTO(result);
  }

  async delete(id: string) {
    await this._mensajes.findByIdAndDelete(id);
  }

  async query(options: OrdenQuery): Promise<OrdenesDTO[]> {
    let query: OrdenQuery = {};

    if (options.user) query.user = options.user;
    if (options.updatedAt) query.updatedAt = options.updatedAt;
    if (options.direccion) query.direccion = options.direccion;

    const result = await this._mensajes.find(query);

    return result.map((aResult) => new OrdenesDTO(aResult));
  }

}