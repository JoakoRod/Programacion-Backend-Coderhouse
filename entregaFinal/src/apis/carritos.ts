import { ValidationResult } from 'joi';
import Config from '../config';
import { ApiError, ErrorStatus } from '../services/error';
import CarritosFactoryDAO from '../models/carritos/carritos.factory';
import { CarritoBaseClass, CarritoI, CarritoQuery, CarritosDTO } from '../models/carritos/carritos.interfaces';
import { CarritoJoiSchema } from '../models/carritos/carritos.schemas';


export default class CarritosAPI {
    private static carritosDAO: CarritoBaseClass;

    constructor() {
        if (!CarritosAPI.carritosDAO) CarritosAPI.carritosDAO = CarritosFactoryDAO.get(Config.PERSISTENCIA);
    }

    static validateSchema(data: any, required: boolean) {
        const result: ValidationResult = CarritoJoiSchema(required).validate(data);
        if (result.error) {
            throw new ApiError(`Esquema no valido. ${result.error}`, ErrorStatus.BadRequest);
        }
    }

    getCarrito(id?: string): Promise<CarritosDTO[] | CarritosDTO> {
        return CarritosAPI.carritosDAO.get(id);
    }

    getOneByIdUserCarrito(id: string): Promise<CarritosDTO | null> {
        return CarritosAPI.carritosDAO.getOneByIdUser(id);
    }

    getCarritoPopulate(populate: string, id?: string): Promise<CarritosDTO[] | CarritosDTO | any> {
        return CarritosAPI.carritosDAO.getPopulate(populate, id);
    }

    addCarrito(data: CarritoI): Promise<CarritosDTO> {
        CarritosAPI.validateSchema(data, true);
        return CarritosAPI.carritosDAO.add(data);
    }

    updateCarrito(id: string, newCarritoData: CarritoI | CarritosDTO): Promise<CarritosDTO> {
        CarritosAPI.validateSchema(newCarritoData, false);
        return CarritosAPI.carritosDAO.update(id, newCarritoData);
    }

    updateOneByIdUserCarrito(id: string, newCarritoData: CarritoI | CarritosDTO): Promise<CarritosDTO> {
        //CarritosAPI.validateSchema(newCarritoData, false);
        return CarritosAPI.carritosDAO.updateOneByIdUser(id, newCarritoData);
    }

    deleteCarrito(id: string): Promise<void> {
        return CarritosAPI.carritosDAO.delete(id);
    }

    deleteOneByIdUserCarrito(id: string): Promise<void> {
        return CarritosAPI.carritosDAO.deleteOneByIdUser(id);
    }

    queryCarrito(campos: CarritoQuery) {
        return CarritosAPI.carritosDAO.query(campos);
    }
}