import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Invoice = new  Schema({
    price: String
});

module.exports = mongoose.model('Invoice', Invoice);