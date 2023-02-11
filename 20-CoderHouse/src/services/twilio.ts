import config from '../config/index'
import { logger } from './logger'

const accountSid = config.accountSid;
const authToken = config.authToken

const client = require('twilio')(accountSid, authToken, {
    lazyLoading: true
});

export async function mandarWsp(msg: string) {
    try {
        const message = await client.messages.create({
            body: msg,
            from: config.twilioPhoneWSP!,
            to: config.myPhoneWSP!
        })
        logger.info(message);
    } catch (error) {
        logger.error(error);
    }
}

export async function mandarWspARemitente(msg:string, senderID:string) {
    try {
        await client.messages.create({
            to: senderID,
            body: msg,
            from: config.twilioPhoneWSP!
        })
    } catch (error) {
        logger.error(error);
    }
}

export async function mandarMsg(msg: string, num: number) {
    try {
        const message = await client.messages.create({
            body: msg,
            from: config.twilioPhone!,
            to: config.myPhone
        })
        logger.info(message);
    } catch (error) {
        logger.error(error);
    }
}