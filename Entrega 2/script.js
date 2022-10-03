const fs = require("fs");
const path = require("path");




class Contenedor {
    constructor(nombreArchivo) {
        this.archivo = nombreArchivo;
    }

    async getAll() {
        try {
            let resultado = await fs.promises.readFile(`./${this.archivo}`, "utf-8");
            return JSON.parse(resultado);
        } catch (error) {
            throw error;
        }
    }

    getById(Number){
        
    }
}



async function main() {
    const contenedor = new Contenedor("productos.txt");
    let productos = await contenedor.getAll();
    console.log(productos);
}

main();