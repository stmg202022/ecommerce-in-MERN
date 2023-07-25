const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const axios = require("axios");

exports.khaltiPaymentProcess = catchAsyncError(async (req, res, next) => {
  try {
    const { token, amount } = req.body;

    let data = {
      token: token,
      amount: amount,
    };

    let config = {
      headers: {
        Authorization: process.env.Khalti_SECRET_KEY,
      },
    };

    const result = await axios
      .post("https://khalti.com/api/v2/payment/verify/", data, config)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

exports.sendKhaltiApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ khalti_public_key: process.env.Khalti_API_KEY });
});
