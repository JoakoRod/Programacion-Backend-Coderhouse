import { UserI } from "../users/users.interfaces";
import mongoose from "mongoose";

export interface OrdenI {
    _id?: string;
    userEmail: mongoose.Schema.Types.ObjectId | string | number,
    items: { _id?: string, idProduct: string, cantidad: number }[],
    direccion: string
    updatedAt?: string
}

export interface OrdenQuery {
    user?: mongoose.Schema.Types.ObjectId | string | number;
    direccion?: string
    updatedAt?: string;
}

export interface OrdenBaseClass {
    updateOneByIdUser(id: string, newOrdenData: OrdenI | OrdenesDTO): Promise<OrdenesDTO>;
    getOneByIdUser(id: string): Promise<OrdenesDTO>;
    getPopulate(populate: string, id: string | null | undefined): Promise<OrdenesDTO | OrdenesDTO[] | any>;
    //getUser(user: string, id: string | undefined): Promise<OrdensDTO | OrdensDTO[]>
    get(id?: string): Promise<OrdenesDTO[] | OrdenesDTO>;
    //getPopulate(populate: string, id: string | undefined | null): Promise<OrdensDTO | OrdensDTO[] | any>;
    add(data: OrdenI): Promise<OrdenesDTO>;
    update(id: string, newOrdenData: OrdenI | OrdenesDTO): Promise<OrdenesDTO>;
    delete(id: string): Promise<void>;
    deleteOneByIdUser(id: string):Promise<void>;
    query(options: OrdenQuery): Promise<OrdenesDTO[]>;
}

export class OrdenesDTO {
    id: string;
    user: string | number | mongoose.Schema.Types.ObjectId | UserI["_id"];
    items: { id?: string, idProduct: string, cantidad: number }[]
    direccion: string
    updatedAt?: string;

    constructor(data: OrdenI) {
        this.id = data._id || '';
        this.updatedAt = data.updatedAt
        this.user = data.user;
        this.items = data.items.map(producto => {
            return { id: producto._id || '' , idProduct: producto.idProduct, cantidad: producto.cantidad }
        });
        this.direccion = data.direccion;
    }
}