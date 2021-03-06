// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const portfolioSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    image: {
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
    description: {
        type: Object,
        default: {en: '', ru: '', am: ''}
    },
    title: {
        type: Object,
        default: {en: '', ru: '', am: ''}
    },
    shortDescription: {
        type: Object,
        default: {en: '', ru: '', am: ''}
    },
    hover: {
        type: Object,
        default: null
    },
    random: String
});


mongoose.model('portfolio', portfolioSchema);

const Portfolio = mongoose.model('portfolio');

module.exports = Portfolio;