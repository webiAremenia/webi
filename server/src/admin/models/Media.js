const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mediaSchema = new Schema({
    alt: {
        type: Object,
        default: {en: '', ru: '', am: ''}
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: Number,
        required: true
    },
});


mongoose.model('media', mediaSchema);

const Media = mongoose.model('media');

module.exports = Media;