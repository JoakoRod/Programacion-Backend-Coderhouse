import mongoose from 'mongoose';
import { MongoDBClient } from '../../../services/database';
import {
  UserI,
  UsersDTO,
  UserBaseClass,
  UserQuery,
} from '../users.interfaces';
import schema from '../schema/users.schema';
import createError from 'http-errors';

export default class UserDao implements UserBaseClass {
  private static instance: UserDao;
  private static client: MongoDBClient;
  
  private users = mongoose.model<UserI>('users', schema);

  static async getInstance(local: boolean = false) {
    if (!UserDao.instance) {
      console.log('Inicializamos DAO Users');
      UserDao.instance = new UserDao();
      await MongoDBClient.getConnection(local);
      UserDao.client = await MongoDBClient.getConnection();
    }
    return UserDao.instance;
  }

  isValid(id: string): boolean {
    return UserDao.client.isValidId(id);
  }

  async get(id?: string): Promise<UsersDTO[] | UsersDTO> {
    let output: UserI[] = [];

    if (id) {
      if (!this.isValid(id))
        throw createError(500, `error con la db, el documento no existe`)
      const document = await this.users.findById(id);
      if (document) return new UsersDTO(document);
      else throw createError(500, `error con la db, el documento no existe`)
    }
    output = await this.users.find();
    return output.map((aUser) => new UsersDTO(aUser));
  }

  async add(data: UserI): Promise<UsersDTO> {
    const newUser = await this.users.create(data);
    return new UsersDTO(newUser);
  }

  async update(id: string, newUserData: UserI): Promise<UsersDTO> {
    const result = await this.users.findByIdAndUpdate(id, newUserData, {
      new: true,
    });
    if (!result)
      throw createError(500, `error con la db, el documento no existe`)
    return new UsersDTO(result);
  }

  async delete(id: string) {
    await this.users.findByIdAndDelete(id);
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

    const result = await this.users.find(query);

    return result.map((aResult) => new UsersDTO(aResult));
  }

  async validate(email: string, phone: string): Promise<UsersDTO[]> {

    const result = await this.users.find({ $or: [{ email: email }, { phone: phone }] });
    const result2 = result.map((aResult) => new UsersDTO(aResult));
    console.log(result2);
    return result2
  }
}
