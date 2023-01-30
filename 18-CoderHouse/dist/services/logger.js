"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const { combine, timestamp, json } = winston_1.default.format;
exports.logger = winston_1.default.createLogger({
    level: 'info',
    format: combine(timestamp(), json()),
    transports: [
        new winston_1.default.transports.Console({ level: 'verbose' }),
        new winston_1.default.transports.File({
            filename: './logs/warn.log',
            level: 'warn',
        }),
        new winston_1.default.transports.File({
            filename: './logs/error.log',
            level: 'error'
        })
    ]
});
//# sourceMappingURL=logger.js.map