const mongoose = require('mongoose');
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


mongoose.model('settings', settingSchema);

const Setting = mongoose.model('settings');

module.exports = Setting;