const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderSchema = new schema({
  productName: String, 
  urlProduct: String,
  price: String, 
});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;