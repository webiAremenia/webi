import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    avatar: {type: String, default: null},
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$/
    },
    password: {type: String, required: true},
    role: {type: String, default: 'staff'},
    permissions: {can_delete: {type: Boolean, default: true}, can_create: {type: Boolean, default: true}}
});


// Export the model
module.exports = mongoose.model('Admin', AdminSchema);

module.exports.getToken = function (admin) {
    return jwt.sign({
            adminId: admin._id,
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            role: admin.role,
            permissions: admin.permissions
        },
        process.env.JWT_Key, {expiresIn: '2h'});
};

