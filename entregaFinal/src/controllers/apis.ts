import apiMessages from '../apis/mensajes';
import apiUsers from '../apis/users';
import apiProducts from '../apis/productos';
import apiCarritos from '../apis/carritos';
import apiOrdenes from '../apis/ordenes';

export const mensajesAPI = new apiMessages;
export const productosAPI = new apiProducts;
export const usuariosAPI = new apiUsers;
export const carritosAPI = new apiCarritos;
export const ordenesAPI = new apiOrdenes;