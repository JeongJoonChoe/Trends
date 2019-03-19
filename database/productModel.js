const mongoose = require('mongoose');
const db = require('./index.js');

const productSchema = new mongoose.Schema({
  brand: String,
  title: String,
  image: String,
  price: String,
  type: String,
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;