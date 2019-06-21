// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const newsSchema = new Schema({
    title: {
        type: Object,
        default: {en: '', ru: '', am: ''}
    },
    description: {
        type: Object,
        default: {en: '', ru: '', am: ''}
    },
    content: {
        type: Object,
        default: {en: '', ru: '', am: ''}
    },
    banner: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: new Date()
    },
    updated: {
        type: Date,
        required: true,
        default: new Date()
    },
    random : String
});


mongoose.model('news', newsSchema);

const News = mongoose.model('news');

module.exports = News;