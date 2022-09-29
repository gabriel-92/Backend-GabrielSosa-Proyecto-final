import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
          id: { type: Number, required: true },
          title: { type: String, default: 'Enter product name' },
          description: { type: String, default: 'Enter product description' },
          price: { type: Number, default: 0 },
          stock: { type: Number, default: 0 },
          category: { type: String, default: 'Enter product category' },
          image: { type: String, default: 'Enter product image' },
          timestamp: { type: Date, default: Date.now },
}, { collection: 'products' });


module.exports = productSchema;