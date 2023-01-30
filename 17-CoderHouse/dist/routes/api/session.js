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
const express_1 = require("express");
const http_errors_1 = __importDefault(require("http-errors"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = require("../../middlewares/auth");
const logger_1 = require("../../services/logger");
const router = (0, express_1.Router)();
router.post('/login', passport_1.default.authenticate('login'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info('POST /api/login');
    try {
        res.json({ msg: 'Bienvenido!!' });
    }
    catch (error) {
        next(error);
    }
}));
router.post('/signup', passport_1.default.authenticate('signup'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info('POST /api/signup');
    try {
        res.json({ msg: 'Bienvenido!!' });
    }
    catch (error) {
        next(error);
    }
}));
router.get('/info', auth_1.isLoggedIn, (req, res) => {
    logger_1.logger.info('GET /api/info');
    res.send({
        session: req.session,
        sessionId: req.sessionID,
        cookies: req.cookies,
    });
});
router.post('/logout', (req, res, next) => {
    logger_1.logger.info('POST /api/logout');
    try {
        req.session.destroy((err) => {
            if (!err)
                res.send('Logout ok!');
            else
                throw (0, http_errors_1.default)(500, 'Logout ERROR');
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=session.js.map