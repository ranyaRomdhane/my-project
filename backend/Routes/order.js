const express = require("express");
const Order = require("../Models/order");

const OrderRouter = express.Router();

//add Product
OrderRouter.post("/add", async (req, res) => {
  try {
    let newproduct = new Order(req.body);
    let result = await newproduct.save();
    res.send({ orders: result, msg: "product is added" });
  } catch (error) {
    console.log(error);
  }
});  


//get all product 
OrderRouter.get("/", async (req, res) => {
  try {
    let result = await Order.find();
    res.send({orders: result, msg: "all product" });
  } catch (error) {
    console.log(error);
  }
});

//get product by id

OrderRouter.get("/:id", async (req, res) => {
  try {
    let result = await Order.findById(req.params.id);
    res.send({ orders: result, msg: "one product" });
  } catch (error) {
    console.log(error);
  }
});

//delete product
OrderRouter.delete("/:id", async (req, res) => {
  try {
    let result = await Order.findByIdAndDelete(req.params.id);
    res.send({ msg: "Product is deleted" });
  } catch (error) {
    console.log(error);
  }
});

//update product
OrderRouter.put("/:id", async (req, res) => {
  try {
    let result = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    res.send({ orders: "result", msg: "product is updated" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = OrderRouter;