const form = document.querySelector('#formProductos');
const formChat = document.querySelector('#chat-form');
const tablaChat = document.querySelector('#tabla-chat');
const botonLogout = document.querySelector('#logout');
const botonesAgregarAlCarrito = document.querySelectorAll('.botonAgregarAlCarrito');
const contCarrito = document.querySelector('#contCarrito');
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
contCarrito.innerHTML = localStorage.getItem('cantCarrito') || 0;

const socket = io();

botonLogout.onclick = () => {
    document.location.href = "/logout";
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
            <td>${producto.descripcion}</td>
            <td><img src="${producto.foto}" class="img-fluid" width="40" height="40"></td>
            <td>${producto.stock}</td>
            <td><button type="button" onclick="agregarProductoAlCarrito('${producto.nombre}')" class="btn btn-outline-secondary botonAgregarAlCarrito">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-bag" viewBox="0 0 16 16">
                                <path
                                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                            </svg>
                </button>
            </td>`;

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

/* botonesAgregarAlCarrito.forEach((boton, key) => {
    boton.onclick = agregarProductoAlCarrito(key)
}); */

function agregarProductoAlCarrito(nombre) {
    contCarrito.innerHTML++;
    const index = carrito.map(producto => producto.nombre).indexOf(nombre);
    if (index != -1) {
        carrito[index].cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            cantidad: 1
        });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('cantCarrito', contCarrito.innerHTML)
}


function comprar() {
    const data = JSON.stringify(carrito);
    fetch('/carrito', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            carrito.length = 0;
            contCarrito.innerHTML = 0;
            localStorage.removeItem('carrito');
            localStorage.removeItem('cantCarrito', 0)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}