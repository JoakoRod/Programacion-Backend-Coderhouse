import nodemailer from 'nodemailer';
import { Logger } from '../services/logger'
import config from '../config/index';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.user,
        pass: config.pass,
    }
   /*  host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'rahul5@ethereal.email',
        pass: 'AzpnG13ep72Q8wqbv5'
    } */
});


export function mandarMail(to: string, subject: string, text: string) {
    let info = transporter.sendMail({
        from: '"Entrega 18" <joa@example.com>', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
    }, function (error, info) {
        if (error) {
            Logger.error(error);
        } else {
            Logger.info('Email sent: ' + info.response);
        }
    });
}
