class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.apellido}, ${this.nombre}`
    }

    addMascota(nombre_mascota) {
        this.mascotas.push(nombre_mascota);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nombre, autor) {
        this.libros.push({nombre: nombre, autor:autor});
    }

    getBookNames() {
        return this.libros.map( libro => libro.nombre)
    }
}

//Instanciar un usuario
let usuario1 = new Usuario("Joaquin Ignacio", "Rodriguez", [{nombre: "Las 48 Leyes Del Poder", autor:"Greene Robert", editorial:"Oceano", lanzamiento:2019},
{nombre: "Damián, Un secreto Oscuro y Perverso", autor:"Alex Mirez", editorial:"Dejavú Ediciones", lanzamiento:2022}], ["michi"]);

//Obtener su nombre completo
console.log(usuario1.getFullName());

//Agregar mascota
usuario1.addMascota("firulais");
console.log(usuario1.mascotas); //Comprobación

//Cantidad de mascotas
console.log(usuario1.countMascotas());

//Agregar libro
usuario1.addBook("El resplandor", "Stephen King");
console.log(usuario1.libros); //Comprobación

//Obtener nombres de los libros
console.log(usuario1.getBookNames());