import mongoose from 'mongoose';
import config from '../../../config';
import { logger } from '../../../services/logger';
//import knex from 'knex';


mongoose.set('strictQuery', true);

export default class DaoMongoDB {
    collection: mongoose.Model<{ [x: string]: any; }, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, { [x: string]: any; }>>;
    initDB: void;
    constructor(collection: any, schema: mongoose.Schema) {
        this.collection = mongoose.model(collection, schema);
        this.initDB = mongoose.connect(config.MONGO_ATLAS_URL, () => console.log("Connected to MongoDB"));
    }

    async initMongoDB() {
        return this.initDB;
    }

    async save(doc: any) {
        try {
            const document = await this.collection.create(doc);
            return document;
        } catch (error) {
            logger.error(error);
        }
    }

    async getAll() {
        try {
            const docs = await this.collection.find({});
            return docs;
        } catch (error) {
            logger.error(error);
        }
    }

    async getAllPopulate(populate: string) {
        try {
            return await this.collection.find().populate(populate).lean();
        } catch (error) {
            logger.error(error);
        }
    }
}