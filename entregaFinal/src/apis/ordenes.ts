import { ValidationResult } from 'joi';
import Config from '../config';
import { ApiError, ErrorStatus } from '../services/error';
import OrdenesFactoryDAO from '../models/ordenes/ordenes.factory';
import { OrdenI, OrdenesDTO, OrdenBaseClass, OrdenQuery } from '../models/ordenes/ordenes.interfaces';
import { OrdenJoiSchema } from '../models/ordenes/ordenes.schemas';

export default class OrdenesAPI {
  private static ordenesDAO: OrdenBaseClass;

  constructor() {
    if (!OrdenesAPI.ordenesDAO) OrdenesAPI.ordenesDAO = OrdenesFactoryDAO.get(Config.PERSISTENCIA);
  }

  static validateSchema(data: any, required: boolean) {
    const result: ValidationResult = OrdenJoiSchema(required).validate(data);

    if (result.error) {
      throw new ApiError(`Esquema no valido. ${result.error}`, ErrorStatus.BadRequest);
    }
  }

  getOrden(id?: string): Promise<OrdenesDTO[] | OrdenesDTO> {
    return OrdenesAPI.ordenesDAO.get(id);
  }

  addOrden(data: OrdenI | any): Promise<OrdenesDTO> {
    OrdenesAPI.validateSchema(data, true);
    return OrdenesAPI.ordenesDAO.add(data);
  }

  updateOrden(id: string, newOrdenData: OrdenI): Promise<OrdenesDTO> {
    OrdenesAPI.validateSchema(newOrdenData, false);
    return OrdenesAPI.ordenesDAO.update(id, newOrdenData);
  }

  deleteOrden(id: string): Promise<void> {
    return OrdenesAPI.ordenesDAO.delete(id);
  }

  queryOrden(campos: OrdenQuery) {
    return OrdenesAPI.ordenesDAO.query(campos);
  }
}
