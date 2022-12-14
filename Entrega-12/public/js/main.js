const form = document.querySelector('#formProductos');
const formChat = document.querySelector('#chat-form');
const tablaChat = document.querySelector('#tabla-chat');
const botonLogout = document.querySelector('#logout');

const socket = io();

botonLogout.onclick = () => {
    document.location.href="/logout";
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const [nombre, descripcion, codigo, foto, precio, stock] = document.querySelectorAll('.form-producto');
    const producto = {
        nombre: nombre.value,
        descripcion: descripcion.value,
        codigo: codigo.value,
        foto: foto.value,
        precio: precio.value,
        stock: stock.value
    }
    console.log(producto);
    agregarProductoALaTabla(producto);
    socket.emit('seAgregoProducto', producto);
    form.reset()
    return false;
})

socket.on('agregarProducto', (producto) => {
    agregarProductoALaTabla(producto);
})

function Creartabla() {
    const html =
        `<header class="chat-header">
            <h4><i class="fas fa-smile"></i>Lista de Productos:</h4>
        </header>
        <table class="table table-hover align-middle cont" id="tabla">
            <thead>
                <tr>
                    <th scope="col">title</th>
                    <th scope="col">price</th>
                    <th scope="col">image</th>
                </tr>
            </thead>
            <tbody id="tablaBody">
            </tbody>
        </table>`;
    document.querySelector('#divTabla').innerHTML = html;
    return document.querySelector('#tablaBody');
}

function agregarProductoALaTabla(producto) {
    const tabla = document.querySelector('#tablaBody') || Creartabla();
    const tr = document.createElement('tr');
    tr.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td><img src="${producto.foto}" class="img-fluid" width="40" height="40"></td>`;

    tabla.appendChild(tr);
}

formChat.addEventListener('submit', (e) => {
    e.preventDefault();

    const [nombreForm, apellidoForm, emailForm, edadForm, aliasForm, avatarForm, msgForm] = document.querySelectorAll('.form-chat');
    const data = {
        author: {
            id: emailForm.value,
            nombre: nombreForm.value,
            apellido: apellidoForm.value,
            edad: edadForm.value,
            alias: aliasForm.value,
            avatar: avatarForm.value
        },
        text: msgForm.value
    };
    socket.emit('envioMSG', data);
    const fecha = ' ' + moment().format("DD/MM/YYYY HH:mm:ss");
    añadirMsg(data, fecha);
    msgForm.value = null;

})

socket.on('recibioMSG', async (data) => {
    añadirMsg(data);
})

function añadirMsg(data, fecha) {
    console.log(data);
    const div = document.createElement('div');
    div.className += 'message';
    div.innerHTML = `
        <p class="meta">${data.author.id}<span> ${data.fecha || fecha}</span></p>
        <p class="text">
            ${data.text}
        </p>`;
    tablaChat.appendChild(div);
}