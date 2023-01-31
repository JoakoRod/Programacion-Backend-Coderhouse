"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mandarMsg = exports.mandarWspARemitente = exports.mandarWsp = void 0;
const index_1 = __importDefault(require("../config/index"));
const logger_1 = require("./logger");
const accountSid = index_1.default.accountSid;
const authToken = index_1.default.authToken;
const client = require('twilio')(accountSid, authToken, {
    lazyLoading: true
});
function mandarWsp(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const message = yield client.messages.create({
                body: msg,
                from: index_1.default.twilioPhoneWSP,
                to: index_1.default.myPhoneWSP
            });
            logger_1.logger.info(message);
        }
        catch (error) {
            logger_1.logger.error(error);
        }
    });
}
exports.mandarWsp = mandarWsp;
function mandarWspARemitente(msg, senderID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.messages.create({
                to: senderID,
                body: msg,
                from: index_1.default.twilioPhoneWSP
            });
        }
        catch (error) {
            logger_1.logger.error(error);
        }
    });
}
exports.mandarWspARemitente = mandarWspARemitente;
function mandarMsg(msg, num) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const message = yield client.messages.create({
                body: msg,
                from: index_1.default.twilioPhone,
                to: index_1.default.myPhone
            });
            logger_1.logger.info(message);
        }
        catch (error) {
            logger_1.logger.error(error);
        }
    });
}
exports.mandarMsg = mandarMsg;
//# sourceMappingURL=twilio.js.map