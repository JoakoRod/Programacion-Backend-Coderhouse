"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mandarMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const logger_1 = require("../services/logger");
const index_1 = __importDefault(require("../config/index"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: index_1.default.user,
        pass: index_1.default.pass,
    }
    /*  host: 'smtp.ethereal.email',
     port: 587,
     auth: {
         user: 'rahul5@ethereal.email',
         pass: 'AzpnG13ep72Q8wqbv5'
     } */
});
function mandarMail(to, subject, text) {
    let info = transporter.sendMail({
        from: '"Entrega 18" <joa@example.com>',
        to: to,
        subject: subject,
        text: text, // plain text body
    }, function (error, info) {
        if (error) {
            logger_1.logger.error(error);
        }
        else {
            logger_1.logger.info('Email sent: ' + info.response);
        }
    });
}
exports.mandarMail = mandarMail;
//# sourceMappingURL=email.js.map