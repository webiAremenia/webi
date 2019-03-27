const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    email : {
        type : String,
        required: true,
        unique: true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    },
});


mongoose.model('admins', adminSchema);

const Admin = mongoose.model('admins');

module.exports = Admin;