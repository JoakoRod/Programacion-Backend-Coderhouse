"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        default: 'user'
    }
});
//Cuando guardemos algo en algun documento, antes de hacer el guardado vamos a ejecutar esta funcion (por eso se llama PRE-SAVE)
//Esta funcion va a agarrar la contraseña que le pasemos y la va a encriptar usando bcrypt
//De ese modo, cuando veamos la contraseña en la db va a estar encriptada y es mas seguro
/* UserSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);

  this.password = hash;
  next();
}); */
//Crearemos un metodo nuevo en nuestro modelo de Users para validar contraseña. 
//Donde le pasaremos la contraseña normal y usando bcrypt vamos a compararla con la
//que esta encriptada. Esto nos va a devolver true o false
/* UserSchema.methods.isValidPassword = async function (password: string | Buffer) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}; */
exports.UserModel = mongoose_1.default.model('user', UserSchema);
//# sourceMappingURL=usuarios.js.map