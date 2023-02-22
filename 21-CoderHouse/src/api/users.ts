import { ValidationResult } from 'joi';
import Config from '../config';
import { Logger } from '../services/logger';
import { UsersFactoryDAO, UsersDAO } from '../models/users/users.factory';
import { UserI, UserQuery, UsersDTO } from '../models/users/users.interfaces';
import { UsersJoiSchema } from '../models/users/users.schemas';

export default class UsersAPI {
    private static instance: UsersAPI;
    private users: UsersDAO;

    private constructor(dao: UsersDAO) {
        this.users = dao;
    }

    static async getInstance(): Promise<UsersAPI> {
        if (!this.instance) {
            const dao = await UsersFactoryDAO.get(Config.PERSISTENCIA);
            UsersAPI.instance = new UsersAPI(dao);
        }

        return UsersAPI.instance;
    }

    validateSchema(data: any) {
        const result: ValidationResult = UsersJoiSchema.validate(data);

        if (result.error) {
            return {
                valid: false,
                errors: result.error.details,
            };
        }

        return {
            valid: true,
        };
    }

    getUser(id?: string): Promise<UsersDTO[] | UsersDTO> {
        return this.users.get(id);
    }

    addUser(data: UserI): Promise<UsersDTO> {
        return this.users.add(data);
    }

    updateUser(id: string, newUserData: UserI): Promise<UsersDTO> {
        return this.users.update(id, newUserData);
    }

    deleteUser(id: string): Promise<void> {
        return this.users.delete(id);
    }

    queryUser(campos: UserQuery): Promise<UsersDTO[]> {
        return this.users.query(campos);
    }

    validateUser(email: string, phone: string): Promise<UsersDTO[]> {
        return this.users.validate(email, phone);
    }
}
