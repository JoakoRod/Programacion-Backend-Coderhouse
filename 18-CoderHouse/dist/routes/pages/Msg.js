"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("../../services/socket");
const express_1 = require("express");
const router = (0, express_1.Router)();
const io = (0, socket_1.getWsServer)();
router.post('/', (req, res, next) => {
    io.sockets.emit();
});
exports.default = router;
//# sourceMappingURL=msg.js.map