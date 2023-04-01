import dotenv from 'dotenv';
import mongoose from 'mongoose';

//configuracion de mongoose
mongoose.set('strictQuery', true);

dotenv.config({
    path: './src/config/.env'
});

//tipos de persistencia
export enum PersistenceType {
    Memoria = 'MEM',
    FileSystem = 'FS',
    MYSQL = 'MYSQL',
    SQLITE3 = 'SQLITE3',
    MongoAtlas = 'MONGO',
    Firebase = 'FIREBASE',
}

export default {
    MONGO_ATLAS_URL: process.env.mongo_atlas || 'mongoSRV', //'mongodb+srv://admin:admin@coderhouse.dahey8p.mongodb.net/Entrega18?retryWrites=true&w=majority'
    /* SQL_CONNECTION: {
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            user: 'ejemplo',
            port: 3306,
            password: '',
            database: 'backend',
        },
    }, */
    MONGO_LOCAL_URL: process.env.mongo_local,
    secret: process.env.secret || 'asd123',
    secret2: process.env.secret2 || 'fgh456',
    user: process.env.user || 'rahul5@ethereal.email',
    pass: process.env.pass,
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    myPhone: process.env.myPhone,
    myPhoneWSP: process.env.myPhoneWSP,
    twilioPhoneWSP: process.env.twilioPhoneWSP,
    twilioPhone: process.env.twilioPhone,
    PERSISTENCIA: PersistenceType.MongoAtlas,
    cookieMaxAge: Number(process.env.cookieMaxAge) || 600
};