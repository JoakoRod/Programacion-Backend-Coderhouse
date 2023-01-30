import winston from 'winston';
const { combine, timestamp, json } = winston.format;

export const logger = winston.createLogger({
    level: 'info',
    format: combine(timestamp(), json()),
    transports: [
        new winston.transports.Console({ level: 'verbose' }),
        new winston.transports.File({
            filename: './logs/warn.log',
            level: 'warn',
        }),
        new winston.transports.File({
            filename: './logs/error.log',
            level: 'error'
        })
    ]
});

