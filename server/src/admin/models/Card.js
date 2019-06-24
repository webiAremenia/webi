import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Card = new Schema({
    title: {
        en: {type: String, required: true,},
        ru: {type: String},
        am: {type: String}
    },
    description: {
        en: {type: String, required: true,},
        ru: {type: String},
        am: {type: String}

    },
    background: {type: String, default: null},
    url: {type: String, default: null}
});

module.exports = mongoose.model('card', Card);

