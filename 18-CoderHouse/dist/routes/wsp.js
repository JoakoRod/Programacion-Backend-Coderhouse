"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const twilio_1 = require("../services/twilio");
const router = (0, express_1.Router)();
router.post('/', (req, res, next) => {
    //let message = req.body.body;
    let senderID = req.body.From;
    console.log(req.body);
    (0, twilio_1.mandarWspARemitente)('mensaje de prueba', senderID);
});
exports.default = router;
//# sourceMappingURL=wsp.js.map