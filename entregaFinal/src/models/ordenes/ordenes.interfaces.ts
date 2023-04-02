import { UserI } from "../users/users.interfaces";
import { ProductI } from "../products/products.interfaces";
import mongoose from "mongoose";

export interface OrdenI {
    _id?: string;
    userEmail: string,
    items: any[],
    numero: number,
    estado: string,
    updatedAt?: string
}

export interface OrdenQuery {
    user?: mongoose.Schema.Types.ObjectId | string | number;
    direccion?: string
    updatedAt?: string;
}

export interface OrdenBaseClass {
    get(id?: string): Promise<OrdenesDTO[] | OrdenesDTO>;
    getPopulate(populate: string, id: string | null | undefined): Promise<OrdenesDTO | OrdenesDTO[] | any>;
    add(data: OrdenI): Promise<OrdenesDTO>;
    update(id: string, newOrdenData: OrdenI | OrdenesDTO): Promise<OrdenesDTO>;
    delete(id: string): Promise<void>;
    query(options: OrdenQuery): Promise<OrdenesDTO[]>;
}

export class OrdenesDTO {
    id: string;
    userEmail: string;
    items: any[];
    numero: number;
    estado: string;
    updatedAt?: string;

    constructor(data: OrdenI) {
        this.id = data._id || '';
        this.updatedAt = data.updatedAt;
        this.userEmail = data.userEmail;
        this.items = data.items;
        this.numero = data.numero;
        this.estado = data.estado;
    }
}