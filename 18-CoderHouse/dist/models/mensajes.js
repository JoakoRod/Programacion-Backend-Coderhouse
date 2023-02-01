"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mensajesModel = exports.mensajesSchema = exports.mensajesCollectionName = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.mensajesCollectionName = 'mensajes';
;
exports.mensajesSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users' },
    text: { type: String, required: true }
}, {
    timestamps: true
});
exports.mensajesModel = mongoose_1.default.model(exports.mensajesCollectionName, exports.mensajesSchema);
//# sourceMappingURL=mensajes.js.map