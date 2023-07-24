const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncError(async (req, res, next) => {
  try {
    console.log(
      "====================================================================",
      req.body.amount
    );
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "npr",
    });

    console.log(
      "******************************************",
      myPayment.client_secret
    );
    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  } catch (error) {
    if (error.message.includes("Amount must convert to at least 50 cents")) {
      res.status(400).json({
        success: false,
        message: "The amount is too low. Please enter a higher amount.",
      });
    } else {
      return next(
        new ErrorHandler("An error occurred. Please try again later.", 404)
      );
    }
  }
});

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ stripeKey: process.env.STRIPE_API_KEY });
});
