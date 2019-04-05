// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const settingSchema = new Schema({
    key: {
        type: String,
        required: true,
        unique : true
    },
    value: {
        type: Object,
        default: {en: '', ru: '', am: ''}
    }
});


mongoose.model('setting', settingSchema);

const Setting = mongoose.model('setting');

module.exports = Setting;