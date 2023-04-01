import Logger from '../services/logger';
import Config from '../config';
import UsersFactoryDAO from '../models/users/users.factory';
import { ValidationResult } from 'joi';
import { ApiError, ErrorStatus } from '../services/error';
import { UsersJoiSchema } from '../models/users/users.schemas';
import { UserBaseClass, UserI, UserQuery } from '../models/users/users.interfaces';

export default class UsersAPI {
  private static usersDAO: UserBaseClass;

  constructor() {
    if (!UsersAPI.usersDAO) UsersAPI.usersDAO = UsersFactoryDAO.get(Config.PERSISTENCIA);
  }
  
  static validateSchema(data: any, required: boolean) {
    const result: ValidationResult = UsersJoiSchema(required).validate(data)

    if (result.error) {
      throw new ApiError(`Esquema no valido. ${result.error}`, ErrorStatus.BadRequest);
    }
  }

  getUser(id?: string) {
    return UsersAPI.usersDAO.get(id);
  }

  addUser(data: UserI) {
    UsersAPI.validateSchema(data, true);
    return UsersAPI.usersDAO.add(data);
  }

  updateUser(id: string, newUserData: UserI) {
    UsersAPI.validateSchema(newUserData, false);
    return UsersAPI.usersDAO.update(id, newUserData);
  }

  deleteUser(id: string): Promise<void> {
    return UsersAPI.usersDAO.delete(id);
  }

  queryUser(campos: UserQuery) {
    return UsersAPI.usersDAO.query(campos);
  }

  validateUser(email: string, phone: string) {
    return UsersAPI.usersDAO.validate(email, phone);
  }
}
