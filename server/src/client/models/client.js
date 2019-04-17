import mongoose from 'mongoose';
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const client = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$/
    },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    nikName: {type: String, required: true},
    status: {type: String, default: null},
    password: {type: String, required: true}
});

module.exports = mongoose.model('Client', client);

module.exports.getToken = function (client) {
    return jwt.sign({
            id: client._id,
            firstName: client.firstName,
            lastName: client.lastName,
            nikName: client.nikName,
            email: client.email,
            status: client.status
        },
        process.env.JWT_Key, {expiresIn: '4h'});
};