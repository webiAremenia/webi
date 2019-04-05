// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const categorySchema = new Schema({
    name: {
        type: Object,
        default: {
            en: {
                type: String,
                required: true,
            },
            ru: {
                type: String
            },
            am: {
                type: String
            }
        }
    }
});


mongoose.model('category', categorySchema);

const Category = mongoose.model('category');

module.exports = Category;