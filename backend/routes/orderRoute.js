const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const { isAuthenticatedUser, authorizRoles } = require("../middleware/auth");

// create Order
router.post("/order/new", isAuthenticatedUser, newOrder);

//get Single Order
router.get(
  "/order/:id",
  isAuthenticatedUser,
  // authorizRoles("admin"),
  getSingleOrder
);

//get User logIn order
router.get("/orders/me", isAuthenticatedUser, myOrders);

//get all order --admin
router.get(
  "/admin/orders",
  isAuthenticatedUser,
  authorizRoles("admin"),
  getAllOrders
);

//update order status --admin
router.put(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizRoles("admin"),
  updateOrder
);

//delete order
router.delete(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizRoles("admin"),
  deleteOrder
);

exports.router = router;
