const form = document.querySelector('#formProductos');
const tabla = document.querySelector('#tablaBody');
const formChat = document.querySelector('#chat-form');
const tablaChat = document.querySelector('#tabla-chat');

const socket = io();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const [titleForm, priceForm, thumbnailForm] = document.querySelectorAll('.form-producto');
    const producto = {
        title: titleForm.value,
        price: priceForm.value,
        thumbnail: thumbnailForm.value
    }
    agregarProductoALaTabla(producto);
    socket.emit('seAgregoProducto', producto);
    form.reset()
})

socket.on('agregarProducto', (producto) => {
    agregarProductoALaTabla(producto);
})

function agregarProductoALaTabla(producto) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
            <td>${producto.title}</td>
            <td>${producto.price}</td>
            <td><img src="${producto.thumbnail}" class="img-fluid" width="40" height="40"></td>`;
    tabla.appendChild(tr);
}

formChat.addEventListener('submit', (e) => {
    e.preventDefault();
    const [usuarioForm, msgForm] = document.querySelectorAll('.form-chat');
    const data = {
        usuario: usuarioForm.value,
        msg: msgForm.value
    };
    
    socket.emit('envioMSG', data);
    data.fecha = ' ' + moment().format("DD/MM/YYYY HH:mm:ss");
    añadirMsg(data);
    msgForm.value = null;
})

socket.on('recibioMSG', (data) => {
    añadirMsg(data);
})

function añadirMsg(data) {
    const div = document.createElement('div');
    div.className += 'message';
    div.innerHTML =`
        <p class="meta">${data.usuario}<span> ${data.fecha}</span></p>
        <p class="text">
            ${data.msg}
        </p>`;
    tablaChat.appendChild(div);
}