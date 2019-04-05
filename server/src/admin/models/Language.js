import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const languageSchema = new Schema({
    value: {
        type: String,
        required: true,
        unique : true
    },
    slug : {
        type: String,
        required: true,
    },
    status : {
        type : String,
        required : true
    }

});


mongoose.model('language', languageSchema);

const Language = mongoose.model('language');

module.exports = Language;