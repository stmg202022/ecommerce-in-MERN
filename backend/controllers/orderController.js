const Order = require("../model/orderModel");
const Product = require("../model/productModel");
const ErrorHandler = require("../utils/errorHandler");

//create an Order
exports.newOrder = async (req, res, next) => {
  const {
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    shippingInfo,
    orderItems,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
};

//get All Orders
exports.getAllOrders = async (req, res, next) => {
  const orders = await Order.find();

  //totalAmount
  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    totalAmount,
    orders,
  });
};

//get single order --admin
exports.getSingleOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("ORDER NOT FOUND WITH THIS ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
};

//get login user orders --user
exports.myOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
};

exports.updateOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("ORDER NOT FOUND WITH THIS ID", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("YOU HAVE ALREADY DELIVERED THIS ORDER", 400));
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

exports.deleteOrder = async (req, res, next) => {
  const order = await Order.findOneAndDelete(req.params.id);

  if (!order) {
    return next(new ErrorHandler("ORDER NOT FOUND WITH THIS ID", 404));
  }

  res.status(200).json({
    success: true,
  });
};
