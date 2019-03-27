const mongoose = require('mongoose');
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
});


mongoose.model('portfolio', portfolioSchema);

const Portfolio = mongoose.model('portfolio');

module.exports = Portfolio;