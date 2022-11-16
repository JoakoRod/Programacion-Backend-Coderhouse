const fs = require('fs');
const createError = require('http-errors');


class Mensajes {
    constructor(nombreArchivo) {
        this.archivo = nombreArchivo;
    }

    async getAll() {
        let resultado = await fs.promises.readFile(`./${this.archivo}`, 'utf-8');
        const resultadoParse = JSON.parse(resultado);
        
        return resultadoParse;
    }
    async escribirArchivo(texto) {
        try {
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(texto, null, 2));
            //console.log("Contenido guardado");
        } catch (error) {
            throw createError(500, 'Error al guardar archivo');;
        }
    }

    async save(msj) {
        const msjs = await this.getAll();
        msjs.push(msj);

        await this.escribirArchivo(msjs);
    }
}

const instanciaMensajes = new Mensajes('src/data/mensajes.json');

module.exports = {
    MensajesController: instanciaMensajes
}