import mongoose from 'mongoose';
import { MongoDBClient } from '../../../services/database';
import {
  ProductI,
  ProductsDTO,
  ProductBaseClass,
  ProductQuery,
} from '../products.interfaces';
import createError from 'http-errors';
import { ProductsModel } from '../products.schemas'

export default class ProductDao implements ProductBaseClass {
  private static instance: ProductDao;
  private static client: MongoDBClient;

  private productos = ProductsModel;

  static async getInstance(local: boolean = false) {
    if (!ProductDao.instance) {
      ProductDao.instance = new ProductDao();
      await MongoDBClient.getConnection(local);
      ProductDao.client = await MongoDBClient.getConnection();
    }
    return ProductDao.instance;
  }

  isValid(id: string): boolean {
    return ProductDao.client.isValidId(id);
  }

  async get(id?: string): Promise<ProductsDTO[] | ProductsDTO> {
    let output: ProductI[] = [];

    if (id) {
      if (!this.isValid(id))
        throw createError(404, `error con la db, el documento no existe`)
      const document = await this.productos.findById(id);
      if (document) return new ProductsDTO(document);
      else throw createError(404, `error con la db, el documento no existe`)
    }
    output = await this.productos.find();
    return output.map((aProduct) => new ProductsDTO(aProduct));
  }

  async add(data: ProductI): Promise<ProductsDTO> {
    const newProduct = await this.productos.create(data);
    return new ProductsDTO(newProduct);
  }

  async update(id: string, newProductData: ProductI): Promise<ProductsDTO> {
    const result = await this.productos.findByIdAndUpdate(id, newProductData, {
      new: true,
    });
    if (!result)
      throw createError(500, `error con la db, el documento no existe`)
    return new ProductsDTO(result);
  }

  async delete(id: string) {
    await this.productos.findByIdAndDelete(id);
  }

  async query(options: ProductQuery): Promise<ProductsDTO[]> {
    let query: ProductQuery = {};

    if (options.nombre) query.nombre = options.nombre;

    if (options.precio) query.precio = options.precio;

    const result = await this.productos.find(query);

    return result.map((aResult) => new ProductsDTO(aResult));
  }
}
