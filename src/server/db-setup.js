const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  roles: Array
});

const roleSchema = new mongoose.Schema({
  name: String,
  permissions: Array
});

const tableSchema = new mongoose.Schema({
  tableNumber: Number,
  totalPrice: Number,
  orders: Array,
  open: Boolean
});

const orderItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String
});

const itemCategorySchema = new mongoose.Schema({
  name: String
});

const User = mongoose.model('User', userSchema);
const Role = mongoose.model('Role', roleSchema);
const Table = mongoose.model('Table', tableSchema);
const OrderItem = mongoose.model('OrderItem', orderItemSchema);
const ItemCategory = mongoose.model('ItemCategory', itemCategorySchema);

module.exports = {
  User, Role, Table, OrderItem, ItemCategory
};
