import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { productosSchema } from './productos';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
/*   avatar: {
    data: Buffer,
    contentType: String,
    require: false
  }, */
  carrito: {
    type: [productosSchema],
    default: []
  },
  role: {
    type: String,
    default: 'user'
  }
});

UserSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);

  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password: string) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

export const UserModel = mongoose.model('user', UserSchema);
