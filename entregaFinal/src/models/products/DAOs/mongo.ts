import mongoose from 'mongoose';
import Logger from '../../../services/logger';
import { ApiError, ErrorStatus } from '../../../services/error';
import { Productschema } from '../products.schemas';
import {
  ProductI,
  ProductsDTO,
  ProductQuery,
} from '../products.interfaces';

export default class ProductosMongoDAO {
  _schema = Productschema;
  _productos = mongoose.model('products', this._schema);

  constructor() {
    Logger.info('Inicializamos DAO Products Mongo');
  }

  isValid(id: string): boolean {
    return mongoose.isValidObjectId(id);
  }

  async get(id?: string): Promise<ProductsDTO[] | ProductsDTO> {
    let output: ProductI[] = [];

    if (id) {
      if (!this.isValid(id))
        throw new ApiError('Documento no existe', ErrorStatus.NotFound);
      const document = await this._productos.findById(id);
      if (document) return new ProductsDTO(document);
      else throw new ApiError('Documento no existe', ErrorStatus.NotFound);
    }
    output = await this._productos.find();
    return output.map((aProduct) => new ProductsDTO(aProduct));
  }

  async add(data: ProductI): Promise<ProductsDTO> {
    const newProduct = await this._productos.create(data);
    return new ProductsDTO(newProduct);
  }

  async update(id: string, newProductData: ProductI): Promise<ProductsDTO> {
    const result = await this._productos.findByIdAndUpdate(id, newProductData, {
      new: true,
    });
    if (!result)
      throw new ApiError('Documento no existe', ErrorStatus.NotFound);
    return new ProductsDTO(result);
  }

  async delete(id: string) {
    await this._productos.findByIdAndDelete(id);
  }

  async query(options: ProductQuery): Promise<ProductsDTO[]> {
    let query: ProductQuery = {};

    if (options.nombre) query.nombre = options.nombre;
    if (options.categoria) query.categoria = options.categoria;
    if (options.precio) query.precio = options.precio;

    const result = await this._productos.find(query);

    return result.map((aResult) => new ProductsDTO(aResult));
  }
}