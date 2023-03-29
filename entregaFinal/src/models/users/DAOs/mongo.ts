import mongoose from 'mongoose';
import Logger from '../../../services/logger';
import { ApiError, ErrorStatus } from '../../../services/error';
import { Userschema } from '../users.schemas';
import {
  UserI,
  UsersDTO,
  UserQuery,
} from '../users.interfaces';

export default class UsuariosMongoDAO {
  _schema = Userschema;
  _usuarios = mongoose.model('users', this._schema);

  constructor() {
    Logger.info('Inicializamos DAO users Mongo');
  }

  isValid(id: string): boolean {
    return mongoose.isValidObjectId(id);
  }

  async get(id?: string): Promise<UsersDTO[] | UsersDTO> {
    let output: UserI[] = [];

    if (id) {
      if (!this.isValid(id))
        throw new ApiError('Documento no existe', ErrorStatus.NotFound);
      const document = await this._usuarios.findById(id);
      if (document) return new UsersDTO(document);
      else throw new ApiError('Documento no existe', ErrorStatus.NotFound);
    }
    output = await this._usuarios.find();
    return output.map((aUser) => new UsersDTO(aUser));
  }

  async add(data: UserI): Promise<UsersDTO> {
    const newUser = await this._usuarios.create(data);
    return new UsersDTO(newUser);
  }

  async update(id: string, newUserData: UserI): Promise<UsersDTO> {
    const result = await this._usuarios.findByIdAndUpdate(id, newUserData, {
      new: true,
    });
    if (!result)
      throw new ApiError('Documento no existe', ErrorStatus.NotFound);
    return new UsersDTO(result);
  }

  async delete(id: string) {
    await this._usuarios.findByIdAndDelete(id);
  }

  async query(options: UserQuery): Promise<UsersDTO[]> {
    let query: UserQuery = {};

    if (options.email) query.email = options.email;

    if (options.firstName) query.firstName = options.firstName;
    if (options.lastName) query.lastName = options.lastName;
    if (options.address) query.address = options.address;
    if (options.age) query.age = options.age;
    if (options.phone) query.phone = options.phone;
    if (options.role) query.role = options.role;

    const result = await this._usuarios.find(query);

    return result.map((aResult) => new UsersDTO(aResult));
  }

  async validate(email: string, phone: string): Promise<UsersDTO[]> {

    const result = await this._usuarios.find({ $or: [{ email: email }, { phone: phone }] });
    const result2 = result.map((aResult) => new UsersDTO(aResult));
    return result2
  }
}