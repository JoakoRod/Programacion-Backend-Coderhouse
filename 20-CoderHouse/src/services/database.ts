import mongoose from 'mongoose';
import config from '../config/index';

export class MongoDBClient {
    private static client: MongoDBClient;

    private constructor() { }

    isValidId(id: string): boolean {
        return mongoose.isValidObjectId(id);
    }

    static async getConnection(local: boolean = false) {
        if (!MongoDBClient.client) {
            console.log('Inicializamos la conexion');
            const srv = local ? config.MONGO_LOCAL_URL! : config.MONGO_ATLAS_URL;
            await mongoose.connect(srv, {});
            MongoDBClient.client = new MongoDBClient();
        }
        return MongoDBClient.client;
    }
}