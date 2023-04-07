const express = require("express");
const productController = require("../controllers/productController");
const { isAuthenticatedUser, authorizRoles } = require("../middleware/auth");
const router = express.Router();

router
  .get("/product", productController.getAllProducts) //get all
  .get("/product/:id", productController.getProductDetails) //get
  //create
  .post(
    "/product/new",
    isAuthenticatedUser,
    authorizRoles("admin"),
    productController.createProduct
  )
  //update
  .put(
    "/product/:id",
    isAuthenticatedUser,
    authorizRoles("admin"),
    productController.updateProduct
  )
  //delete
  .delete(
    "/product/:id",
    isAuthenticatedUser,
    authorizRoles("admin"),
    productController.deleteProduct
  ) //create review
  .put("/review", isAuthenticatedUser, productController.createProductReviews)
  //get reviews
  .get("/reviews", productController.getProductReviews)
  //delete review
  .delete(
    "/reviews",
    isAuthenticatedUser,
    productController.deleteProductReview
  );

exports.router = router;
