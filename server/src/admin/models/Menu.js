// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const menuSchema = new Schema({
    title: {
        type: Object,
        default: {en: '', ru: '', am: ''}
    },
    type: {
        type : String,
        required : true
    },
    typeId: {
        type: String,
        required: true
    },
    parent : {
        type : String,
    },
    order : {
        type : Number
    }
});


mongoose.model('menu', menuSchema);

const Menu = mongoose.model('menu');

module.exports = Menu;