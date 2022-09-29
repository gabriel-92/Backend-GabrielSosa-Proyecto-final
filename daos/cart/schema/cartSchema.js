import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    products: { type: Array, default: [] },
}, { collection: 'cart' });


module.exports = productSchema;