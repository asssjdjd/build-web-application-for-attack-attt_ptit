const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, enum: ['S', 'M', 'L', 'XL'], required: true },
  sold: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 },  // Doanh số = price * sold
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Product', productSchema);