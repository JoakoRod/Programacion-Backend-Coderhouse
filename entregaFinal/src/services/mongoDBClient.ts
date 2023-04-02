import Config from '../config'
import mongoose from "mongoose";
import Logger from './logger';

export default class MongoDBClient {
	private static client: MongoDBClient;

	static async getConnection(local: boolean = false) {
		if (!MongoDBClient.client) {
			Logger.info('Estableciendo conexion Mongo')
			const srv = local ? Config.MONGO_LOCAL_URL! : Config.MONGO_ATLAS_URL!;
			await mongoose.connect(srv, {});
            MongoDBClient.client = new MongoDBClient();
		}
		return MongoDBClient.client;
	}
}