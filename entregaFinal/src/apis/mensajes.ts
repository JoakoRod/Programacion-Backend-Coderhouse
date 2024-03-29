import { ValidationResult } from 'joi';
import Config from '../config';
import { ApiError, ErrorStatus } from '../services/error';
import MessagesFactoryDAO from '../models/messages/messages.factory';
import { MessageBaseClass, MessageI, MessageQuery, MessagesDTO } from '../models/messages/messages.interfaces';
import { MessageJoiSchema } from '../models/messages/messages.schemas';


export default class MessagesAPI {
    private static messagesDAO: MessageBaseClass;

    constructor() {
        if (!MessagesAPI.messagesDAO) MessagesAPI.messagesDAO = MessagesFactoryDAO.get(Config.PERSISTENCIA);
    }

    static validateSchema(data: any, required: boolean) {
        const result: ValidationResult = MessageJoiSchema(required).validate(data);
        if (result.error) {
            throw new ApiError(`Esquema no valido. ${result.error}`, ErrorStatus.BadRequest);
        }
    }

    getMessage(id?: string): Promise<MessagesDTO[] | MessagesDTO> {
        return MessagesAPI.messagesDAO.get(id);
    }

    getMessagePopulate(populate: string, id?: string | null): Promise<MessagesDTO[] | MessagesDTO | any> {
        return MessagesAPI.messagesDAO.getPopulate(populate, id);
    }

    getMessageUser(user: string, id?: string): Promise<MessagesDTO[] | MessagesDTO | any> {
        return MessagesAPI.messagesDAO.getUser(user, id);
    }

    addMessage(data: MessageI): Promise<MessagesDTO> {
        MessagesAPI.validateSchema(data, true);
        return MessagesAPI.messagesDAO.add(data);
    }

    updateMessage(id: string, newMessageData: MessageI): Promise<MessagesDTO> {
        MessagesAPI.validateSchema(newMessageData, false);
        return MessagesAPI.messagesDAO.update(id, newMessageData);
    }

    deleteMessage(id: string): Promise<void> {
        return MessagesAPI.messagesDAO.delete(id);
    }

    queryMessage(campos: MessageQuery) {
        return MessagesAPI.messagesDAO.query(campos);
    }
}