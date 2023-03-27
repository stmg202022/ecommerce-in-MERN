const express = require("express");
const {createProduct, getAllProducts, getProduct, updateProduct, deleteProduct} = require("../controllers/productController")
const router = express.Router();

router
    .post("/product/new", createProduct) //create
    .get("/product",getAllProducts)//getall
    .get("/product/:id", getProduct) //get
    .put("/product/:id", updateProduct) //update
    .delete("/product/:id", deleteProduct) //delete

exports.router = router;

