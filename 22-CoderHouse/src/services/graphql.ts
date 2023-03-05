import { buildSchema } from 'graphql';
import { mensajesAPI, usersAPI, productosAPI } from '../api/'

let productosDao: productosAPI;
let messagesDao: mensajesAPI;
let usersDao: usersAPI;

productosAPI.getInstance().then((instance) => {
  productosDao = instance;
});

mensajesAPI.getInstance().then((instance) => {
  messagesDao = instance;
});

usersAPI.getInstance().then(async (instance) => {
  usersDao = instance;
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
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    },
    type MessagePopulate {
      id: Int
      title: String
      author: String
      description: String
      topic: String
      url: String
  },
    type Product {
      id: Int
      title: String
      author: String
      description: String
      topic: String
      url: String
    },
    type User {
      id: Int
      title: String
      author: String
      description: String
      topic: String
      url: String
    },
    input MessageInput {
      title: String
      author: String
      description: String
      topic: String
      url: String
    },
    input ProductInput {
      title: String
      author: String
      description: String
      topic: String
      url: String
    },
    input UserInput {
      title: String
      author: String
      description: String
      topic: String
      url: String
    },
`);

// Root resolver
export const graphqlRoot = {
  getMessage: messagesDao.getMessage,
  getMessages: messagesDao.getMessage,
  getMessagesPopulate: messagesDao.getMessagePopulate,
  getMessagePopulate: messagesDao.getMessagePopulate,
  getProduct: productosDao.getProduct,
  getProducts: productosDao.getProduct,
  getUser: usersDao.getUser,
  getUsers: usersDao.getUser,
  addMessage: messagesDao.addMessage,
  updateMessage: messagesDao.updateMessage,
  deleteMessage: messagesDao.deleteMessage,
  addProduct: productosDao.addProduct,
  updateProduct: productosDao.updateProduct,
  deleteProduct: productosDao.deleteProduct,
  addUser: usersDao.addUser,
  updateUser: usersDao.updateUser,
  deleteUser: usersDao.deleteUser
};