import config from '../config/index'
import { Logger } from './logger'

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
        Logger.info(message);
    } catch (error) {
        Logger.error(error);
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
        Logger.error(error);
    }
}

export async function mandarMsg(msg: string, num: number) {
    try {
        const message = await client.messages.create({
            body: msg,
            from: config.twilioPhone!,
            to: config.myPhone
        })
        Logger.info(message);
    } catch (error) {
        Logger.error(error);
    }
}