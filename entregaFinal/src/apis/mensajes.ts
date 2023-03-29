import { ValidationResult } from 'joi';
import Config from '../config';
import { ApiError, ErrorStatus } from '../services/error';
import Logger from '../services/logger';
import MessagesFactoryDAO from '../models/messages/messages.factory';
import { MessageBaseClass, MessageI, MessagesDTO } from '../models/messages/messages.interfaces';
import { MessageJoiSchema } from '../models/messages/messages.schemas';


export default class MessagesAPI {
    private static messagesDAO: MessageBaseClass;

    constructor() {
        if (!MessagesAPI.messagesDAO) MessagesAPI.messagesDAO = MessagesFactoryDAO.get(Config.PERSISTENCIA);
    }

    validateSchema(data: any, required: boolean) {
        const result: ValidationResult = MessageJoiSchema(required).validate(data);
        if (result.error) {
            throw new ApiError(`Esquema no valido. ${result.error.details}`, ErrorStatus.BadRequest);
        }
    }

    getMessage(id?: string): Promise<MessagesDTO[] | MessagesDTO> {
        return MessagesAPI.messagesDAO.get(id);
    }

    getMessagePopulate(populate: string, id?: string): Promise<MessagesDTO[] | MessagesDTO> {
        return MessagesAPI.messagesDAO.getPopulate(populate, id);
    }

    addMessage(data: MessageI): Promise<MessagesDTO> {
        return MessagesAPI.messagesDAO.add(data);
    }

    updateMessage(id: string, newMessageData: MessageI): Promise<MessagesDTO> {
        return MessagesAPI.messagesDAO.update(id, newMessageData);
    }

    deleteMessage(id: string): Promise<void> {
        return MessagesAPI.messagesDAO.delete(id);
    }
}