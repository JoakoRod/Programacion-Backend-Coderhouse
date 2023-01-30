"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: './src/config/.env'
});
exports.default = {
    MONGO_ATLAS_URL: process.env.mongo_atlas || 'mongoSRV',
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
    secret: process.env.secret || 'asd123',
    secret2: process.env.secret2 || 'fgh456'
};
//# sourceMappingURL=index.js.map