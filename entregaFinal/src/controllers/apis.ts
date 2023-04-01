import apiMessages from '../apis/mensajes'
import apiUsers from '../apis/users'
import apiProducts from '../apis/productos'
import apiCarrito from '../apis/carritos'

export const mensajesAPI = new apiMessages;
export const productosAPI = new apiProducts;
export const usuariosAPI = new apiUsers;
export const carritosAPI = new apiCarrito;