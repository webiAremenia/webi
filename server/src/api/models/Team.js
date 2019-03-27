const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const teamSchema = new Schema({
    avatar: {
        type: String,
        required: true
    },
    fullName: {
        type: Object,
        default: {en: '', ru: '', am: ''}
    },
    position: {
        type: Object,
        default: {en: '', ru: '', am: ''}
    },
    info: {
        type: Object,
        default: {en: '', ru: '', am: ''}
    },
    sort: {
        type: Number,
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
});


mongoose.model('teams', teamSchema);

const Team = mongoose.model('teams');

module.exports = Team;