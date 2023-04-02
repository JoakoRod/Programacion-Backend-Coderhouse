import { ValidationResult } from 'joi';
import Config from '../config';
import { ApiError, ErrorStatus } from '../services/error';
import ProductsFactoryDAO from '../models/products/products.factory';
import { ProductI, ProductsDTO, ProductBaseClass, ProductQuery } from '../models/products/products.interfaces';
import { ProductJoiSchema } from '../models/products/products.schemas';

export default class ProductsAPI {
  private static productsDAO: ProductBaseClass;

  constructor() {
    if (!ProductsAPI.productsDAO) ProductsAPI.productsDAO = ProductsFactoryDAO.get(Config.PERSISTENCIA);
  }

  static validateSchema(data: any, required: boolean) {
    const result: ValidationResult = ProductJoiSchema(required).validate(data);

    if (result.error) {
      throw new ApiError(`Esquema no valido. ${result.error}`, ErrorStatus.BadRequest);
    }
  }

  getProduct(id?: string): Promise<ProductsDTO[] | ProductsDTO> {
    return ProductsAPI.productsDAO.get(id);
  }

  addProduct(data: ProductI): Promise<ProductsDTO> {
    ProductsAPI.validateSchema(data, true);
    return ProductsAPI.productsDAO.add(data);
  }

  updateProduct(id: string, newProductData: ProductI): Promise<ProductsDTO> {
    ProductsAPI.validateSchema(newProductData, false);
    return ProductsAPI.productsDAO.update(id, newProductData);
  }

  deleteProduct(id: string): Promise<void> {
    return ProductsAPI.productsDAO.delete(id);
  }

  queryProduct(campos: ProductQuery) {
    return ProductsAPI.productsDAO.query(campos);
  }
}
