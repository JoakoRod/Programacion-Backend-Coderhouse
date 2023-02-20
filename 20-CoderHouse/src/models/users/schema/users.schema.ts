import mongoose from "mongoose";
import { UserI } from "../users.interfaces";
import bcrypt from 'bcrypt'

const schema = new mongoose.Schema<UserI>(
    {
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
        role: {
            type: String,
            default: 'user'
        }
    },
    { versionKey: false }
);

schema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);

    this.password = hash;
    next();
});

export default schema;