import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://admin:admin@coderhouse.dahey8p.mongodb.net/Entrega10?retryWrites=true&w=majority';

export const initMongoDB = async () => {
    try {
        console.log('conectando a la db');
        await mongoose.connect(connectionString);

        console.log('conexion funcionando!');
    } catch (error) {
        console.log(`Error => ${error}`);
        return error;
    }
};