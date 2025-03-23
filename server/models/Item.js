const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Student
    ref: 'students',
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  condition: {
    type: String, // "New" or "Used"
    required: true,
  },
  status: {
    type: String, // "Available" or "Sold"
    default: 'Available',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
