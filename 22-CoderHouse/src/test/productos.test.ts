import supertest from 'supertest';
import { ProductsModel } from '../models/products/products.schemas';
import Server from '../services/server';

describe('Test E2E de Productos', () => {
  let request: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    request = supertest(Server);
    await ProductsModel.deleteMany();
  });

  afterEach(async () => {
    console.log('EJECUTO afterEach PARA BORRAR TODO LO QUE HAYA CREADO EN LOS TESTS');
    await ProductsModel.deleteMany();
  });

  afterAll(async () => {
    Server.close();
  });

  it('Deberia traer una lista vacia de productos', async () => {
    const expectedResponse: any = []

    const response = await request.get('/api/productos');
    expect(response.body).toEqual(expectedResponse);
  });

  it('Deberia devolverme un error 404 si quiero buscar un producto que no existe', async () => {
    const expectedResponse = {
      msg: "error con la db, el documento no existe",
    };

    const response = await request.get('/api/productos/1234');

    expect(response.status).toEqual(404);
    /* expect(response.body).toEqual(expectedResponse); */ //para probar, desactivar el stack
  });

  it('Deberia devolverme un error 401 si quiero crear un producto y no estoy logeado', async () => {
    let response = await request.post('/api/productos');
    expect(response.status).toEqual(401);
  });

  /* it("Deberia crear un objeto correctamente", async () => {
    const body = {
      nombre: 'Remera',
      precio: 22,
      stock: 15,
    };

    let response = await request.post('/api/products').send(body);

    expect(response.status).toEqual(200);
    expect(response.body.msg).toEqual('producto agregado con exito');
    expect(response.body.data).toBeDefined();

    const newProductId = response.body.data._id;

    const expectedResponse = {
      data: [
        { _id: newProductId, ...body }
      ]
    }
    response = await request.get(`/api/products/${newProductId}`);
    expect(response.status).toEqual(200);

    expect(response.body).toEqual(expectedResponse);

  }) */
});