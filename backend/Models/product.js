const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  productName: String,
  description: String,
 urlProduct: String, 
  price: String, 
  livraison:String ,
  idCategory:String
});
const Product = mongoose.model("Product", userSchema);
module.exports = Product; 