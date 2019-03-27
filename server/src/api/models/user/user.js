import mongoose from 'mongoose';
import friendsPlugin from 'mongoose-friends-plugin';
import fs from 'fs';
import bcrypt from "bcrypt";
import helper from "../../../_helpers/functions";

mongoose.Promise = global.Promise;

const jwt = require('jsonwebtoken');


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    avatar: {type: String, default: null},
    email: {
        type: String, required: true, unique: true,
        match: /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$/
    },
    password: {type: String, required: true},
    is_active: {type: Boolean, default: true},
    registration_date: {type: Date},
    deleted: {type: Boolean, default: false},
    message: {type: String}
});

UserSchema.plugin(friendsPlugin());
const User = mongoose.model('User', UserSchema);
module.exports = User;

module.exports.checkPass = (pass, user, res) => {
    bcrypt.compare(pass, user.password, (err, result) => {
        if (err) {
            return res.status(401).json({success: false, error: 'Auth failed'});
        }
        if (result) {
            return res.status(200).json({
                success: true,
                token: getToken(user.email, user._id)
            });
        }
        return res.status(401).json({success: false, error: 'Auth failed'});
    })
};

module.exports.createUserAndSave = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({error: err});
        } else {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                registration_date: new Date()
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        success: true,
                        data: {
                            id: result._id,
                            name: result.firstName,
                            email: result.email,
                            registrationDate: result.registration_date
                        }
                    });
                })
                .catch(e => helper.errorHandler(res, e));
        }
    });
};

module.exports.deleteAvatar = (avatar) => {
    const path = `src/_uploads/users/${avatar}`;
    fs.unlink(path, (err) => {
        console.log(err);
    });
};


function getToken(email, userId) {
    return jwt.sign({userId: userId}, process.env.JWT_Key, {expiresIn: '3h'});
}
