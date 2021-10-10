const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  roles: Array
});

const orderSchema = new mongoose.Schema({
  items: Array
});

const tableSchema = new mongoose.Schema({
  tableNumber: Number,
  totalPrice: Number,
  orders: Array
});

const orderItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String
});

const itemCategorySchema = new mongoose.Schema({
  name: String
})

const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);
const Table = mongoose.model('Table', tableSchema);
const OrderItem = mongoose.model('OrderItem', orderItemSchema);
const ItemCategory = mongoose.model('ItemCategory', itemCategorySchema);

module.exports = { User, Order, Table, OrderItem, ItemCategory };
