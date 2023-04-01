import { UserI } from "../users/users.interfaces";
import mongoose from "mongoose";

export interface CarritoI {
    _id?: string;
    user: mongoose.Schema.Types.ObjectId | string | number,
    items: Array<object> | mongoose.Schema.Types.Array,
    direccion: string
    updatedAt?: string
}

export interface CarritoQuery {
    user?: mongoose.Schema.Types.ObjectId | string | number;
    direccion?: string
    updatedAt?: string;
}

export interface CarritoBaseClass {
    //getUser(user: string, id: string | undefined): Promise<CarritosDTO | CarritosDTO[]>
    get(id?: string): Promise<CarritosDTO[] | CarritosDTO>;
    //getPopulate(populate: string, id: string | undefined | null): Promise<CarritosDTO | CarritosDTO[] | any>;
    add(data: CarritoI): Promise<CarritosDTO>;
    update(id: string, newCarritoData: CarritoI): Promise<CarritosDTO>;
    delete(id: string): Promise<void>;
    query(options: CarritoQuery): Promise<CarritosDTO[]>;
}

export class CarritosDTO {
    id: string;
    user: string | number | mongoose.Schema.Types.ObjectId | UserI["_id"];
    items:  Array<object> | mongoose.Schema.Types.Array;
    direccion: string
    updatedAt?: string;

    constructor(data: CarritoI) {
        this.user = data.user;
        this.items = data.items;
        this.direccion = data.direccion;
        this.id = data._id || '';
        this.updatedAt = data.updatedAt
    }
}