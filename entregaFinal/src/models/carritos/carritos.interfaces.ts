import { UserI } from "../users/users.interfaces";
import mongoose from "mongoose";

export interface CarritoI {
    _id?: string;
    user: mongoose.Schema.Types.ObjectId | string | number,
    items: { _id?: string, idProduct: string, cantidad: number }[],
    direccion: string
    updatedAt?: string
}

export interface CarritoQuery {
    user?: mongoose.Schema.Types.ObjectId | string | number;
    direccion?: string
    updatedAt?: string;
}

export interface CarritoBaseClass {
    updateOneByIdUser(id: string, newCarritoData: CarritoI | CarritosDTO): Promise<CarritosDTO>;
    getOneByIdUser(id: string): Promise<CarritosDTO>;
    getPopulate(populate: string, id: string | null | undefined): Promise<CarritosDTO | CarritosDTO[] | any>;
    //getUser(user: string, id: string | undefined): Promise<CarritosDTO | CarritosDTO[]>
    get(id?: string): Promise<CarritosDTO[] | CarritosDTO>;
    //getPopulate(populate: string, id: string | undefined | null): Promise<CarritosDTO | CarritosDTO[] | any>;
    add(data: CarritoI): Promise<CarritosDTO>;
    update(id: string, newCarritoData: CarritoI | CarritosDTO): Promise<CarritosDTO>;
    delete(id: string): Promise<void>;
    deleteOneByIdUser(id: string):Promise<void>;
    query(options: CarritoQuery): Promise<CarritosDTO[]>;
}

export class CarritosDTO {
    id: string;
    user: string | number | mongoose.Schema.Types.ObjectId | UserI["_id"];
    items: { id?: string, idProduct: string, cantidad: number }[]
    direccion: string
    updatedAt?: string;

    constructor(data: CarritoI) {
        this.id = data._id || '';
        this.updatedAt = data.updatedAt
        this.user = data.user;
        this.items = data.items.map(producto => {
            return { id: producto._id || '' , idProduct: producto.idProduct, cantidad: producto.cantidad }
        });
        this.direccion = data.direccion;
    }
}