const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

//This is for authentication:to checked the token from cookeis by jwt to access
exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  // console.log(token);

  if (!token) {
    return next(new ErrorHandler("please Login to Access all product."));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  // console.log(req.user);
  next(); //FOR FURTHER PROCESS ACCESSING
};

exports.authorizRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource.`,
          403
        )
      );
    }

    next();
  };
};
