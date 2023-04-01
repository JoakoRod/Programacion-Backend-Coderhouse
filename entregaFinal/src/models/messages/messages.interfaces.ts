import { UserI } from "../users/users.interfaces";
import mongoose from "mongoose";

export interface MessageI {
    _id?: string;
    user: mongoose.Schema.Types.ObjectId | string | number,
    text: string
    updatedAt?: string
}

export interface MessageQuery {
    user?: mongoose.Schema.Types.ObjectId | string | number;
    text?: string;
}

export interface MessageBaseClass {
    getUser(user: string, id: string | undefined): Promise<MessagesDTO | MessagesDTO[]>
    get(id?: string): Promise<MessagesDTO[] | MessagesDTO>;
    getPopulate(populate: string, id: string | undefined | null): Promise<MessagesDTO | MessagesDTO[] | any>;
    add(data: MessageI): Promise<MessagesDTO>;
    update(id: string, newMessageData: MessageI): Promise<MessagesDTO>;
    delete(id: string): Promise<void>;
    query(options: MessageQuery): Promise<MessagesDTO[]>;
}

export class MessagesDTO {
    id: string;
    user: string | number | mongoose.Schema.Types.ObjectId | UserI["_id"];
    text: string;
    updatedAt?: string;

    constructor(data: MessageI) {
        this.id = data._id || '';
        this.updatedAt = data.updatedAt
        this.user = data.user;
        this.text = data.text;
    }
}