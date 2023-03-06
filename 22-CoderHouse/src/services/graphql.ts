import { SchemaComposer } from 'graphql-compose';
import { ProductGraphQlModel } from '../models/products/products.schemas';
import { MessageGraphQlModel } from '../models/messages/messages.schemas';
import { UserGraphQlModel } from '../models/users/users.schemas';

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
  productById: ProductGraphQlModel.getResolver('findById'),
  productByIds: ProductGraphQlModel.getResolver('findByIds'),
  productOne: ProductGraphQlModel.getResolver('findOne'),
  productMany: ProductGraphQlModel.getResolver('findMany'),
  productCount: ProductGraphQlModel.getResolver('count'),
  productConnection: ProductGraphQlModel.getResolver('connection'),
  productPagination: ProductGraphQlModel.getResolver('pagination'),

  messageById: MessageGraphQlModel.getResolver('findById'),
  messageByIds: MessageGraphQlModel.getResolver('findByIds'),
  messageOne: MessageGraphQlModel.getResolver('findOne'),
  messageMany: MessageGraphQlModel.getResolver('findMany'),
  messageCount: MessageGraphQlModel.getResolver('count'),
  messageConnection: MessageGraphQlModel.getResolver('connection'),
  messagePagination: MessageGraphQlModel.getResolver('pagination'),

  userById: UserGraphQlModel.getResolver('findById'),
  userByIds: UserGraphQlModel.getResolver('findByIds'),
  userOne: UserGraphQlModel.getResolver('findOne'),
  userMany: UserGraphQlModel.getResolver('findMany'),
  userCount: UserGraphQlModel.getResolver('count'),
  userConnection: UserGraphQlModel.getResolver('connection'),
  userPagination: UserGraphQlModel.getResolver('pagination'),
});

schemaComposer.Mutation.addFields({
  productCreateOne: ProductGraphQlModel.getResolver('createOne'),
  productCreateMany: ProductGraphQlModel.getResolver('createMany'),
  productUpdateById: ProductGraphQlModel.getResolver('updateById'),
  productUpdateOne: ProductGraphQlModel.getResolver('updateOne'),
  productUpdateMany: ProductGraphQlModel.getResolver('updateMany'),
  productRemoveById: ProductGraphQlModel.getResolver('removeById'),
  productRemoveOne: ProductGraphQlModel.getResolver('removeOne'),
  productRemoveMany: ProductGraphQlModel.getResolver('removeMany'),

  messageCreateOne: MessageGraphQlModel.getResolver('createOne'),
  messageCreateMany: MessageGraphQlModel.getResolver('createMany'),
  messageUpdateById: MessageGraphQlModel.getResolver('updateById'),
  messageUpdateOne: MessageGraphQlModel.getResolver('updateOne'),
  messageUpdateMany: MessageGraphQlModel.getResolver('updateMany'),
  messageRemoveById: MessageGraphQlModel.getResolver('removeById'),
  messageRemoveOne: MessageGraphQlModel.getResolver('removeOne'),
  messageRemoveMany: MessageGraphQlModel.getResolver('removeMany'),

  userCreateOne: UserGraphQlModel.getResolver('createOne'),
  userCreateMany: UserGraphQlModel.getResolver('createMany'),
  userUpdateById: UserGraphQlModel.getResolver('updateById'),
  userUpdateOne: UserGraphQlModel.getResolver('updateOne'),
  userUpdateMany: UserGraphQlModel.getResolver('updateMany'),
  userRemoveById: UserGraphQlModel.getResolver('removeById'),
  userRemoveOne: UserGraphQlModel.getResolver('removeOne'),
  userRemoveMany: UserGraphQlModel.getResolver('removeMany'),
});

export const graphqlSchema = schemaComposer.buildSchema();

/* import { buildSchema } from 'graphql';
import { mensajesAPI, usersAPI, productosAPI } from '../api/' */

/*let productosDao: productosAPI;
let messagesDao: mensajesAPI;
let usersDao: usersAPI;

productosAPI.getInstance().then((instance) => {
  productosDao = instance;
  graphqlRoot.getProduct = productosDao.getProduct;
  graphqlRoot.getProducts = productosDao.getProduct;
  graphqlRoot.addProduct = productosDao.addProduct;
  graphqlRoot.updateProduct = productosDao.updateProduct;
  graphqlRoot.deleteProduct = productosDao.deleteProduct;
});

mensajesAPI.getInstance().then((instance) => {
  messagesDao = instance;
  graphqlRoot.getMessage = messagesDao.getMessage;
  graphqlRoot.getMessages = messagesDao.getMessage;
  graphqlRoot.getMessagesPopulate = messagesDao.getMessagePopulate;
  graphqlRoot.getMessagePopulate = messagesDao.getMessagePopulate;
  graphqlRoot.addMessage = messagesDao.addMessage;
  graphqlRoot.updateMessage = messagesDao.updateMessage;
  graphqlRoot.deleteMessage = messagesDao.deleteMessage;
});

usersAPI.getInstance().then(async (instance) => {
  usersDao = instance;
  graphqlRoot.getUser = usersDao.getUser;
  graphqlRoot.getUsers = usersDao.getUser;
  graphqlRoot.addUser = usersDao.addUser;
  graphqlRoot.updateUser = usersDao.updateUser;
  graphqlRoot.deleteUser = usersDao.deleteUser;
}); 



export const graphqlSchema = buildSchema(`
    type Query {
        getMessage(id: String!): Message,
        getMessages: Message,
        getMessagesPopulate(populate: String!): [MessagePopulate],
        getMessagePopulate(populate: String!, id: String!): MessagePopulate,
        getProduct(id: String!): Product,
        getProducts: [Product],
        getUser(id: String!): User,
        getUsers: [User],
    },
    type Mutation {
        addMessage(data: MessageInput!): Message,
        updateMessage(id: String!, data: MessageInput!): Message,
        deleteMessage(id: String!): Message,
        addProduct(data: ProductInput!): Product,
        updateProduct(id: String!, data: ProductInput!): Product,
        deleteProduct(id: String!): Product,
        addUser(data: UserInput!): User,
        updateUser(id: String!, data: UserInput!): User,
        deleteUser(id: String!): User
    },
    type Message {
        id: String,
        user: String,
        text: String,
        updatedAt: String
    },
    type MessagePopulate {
      id: String,
      user: User,
      text: String,
      updatedAt: String
    },
    type Product {
      id: String,
      nombre: String,
      descripcion: String,
      codigo: Int,
      foto: String,
      precio: Int,
      hasStock: Boolean,
      stock: Int
    },
    type User {
      id: String,
      email: String,
      password: String,
      firstName: String,
      lastName: String,
      address: String,
      age: Int,
      phone: String,
      role: String
    },
    input MessageInput {
      user: String,
      text: String,
      updatedAt: String
    },
    input ProductInput {
      nombre: String,
      descripcion: String,
      codigo: Int,
      foto: String,
      precio: Int,
      hasStock: Boolean,
      stock: Int
    },
    input UserInput {
      email: String,
      password: String,
      firstName: String,
      lastName: String,
      address: String,
      age: Int,
      phone: String,
      role: String
    },
`);*/