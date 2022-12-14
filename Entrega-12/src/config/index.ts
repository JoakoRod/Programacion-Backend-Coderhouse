import dotenv from 'dotenv';

dotenv.config({
    path: './src/config/.env'
});

export default {
    MONGO_ATLAS_URL: process.env.mongo_atlas || 'mongoSRV', //mongo_atlas='mongodb+srv://admin:admin@coderhouse.dahey8p.mongodb.net/Entrega12?retryWrites=true&w=majority'
    PORT: process.env.PORT || 8080,
    SQL_CONNECTION: {
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            user: 'ejemplo',
            port: 3306,
            password: '',
            database: 'backend',
        },
    },
};