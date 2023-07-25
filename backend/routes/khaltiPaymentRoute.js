const express = require("express");
//creating the router from express
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  khaltiPaymentProcess,
  sendKhaltiApiKey,
} = require("../controllers/khaltiController.js");

//using the router for creating the path
router.post(
  "/khalti/payment/process",
  isAuthenticatedUser,
  khaltiPaymentProcess
);
router.get("/khaltiapikey", isAuthenticatedUser, sendKhaltiApiKey);

exports.router = router; //exporting the router for using/joining the our application path
