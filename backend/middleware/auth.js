const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

// ===========================================================================================================================================================================
// ===========================================================================================================================================================================
//This is for authentication:to checked the token from cookeis by jwt to access
exports.isAuthenticatedUser = async (req, res, next) => {
  // const { token } = req.cookies;

  //In here token is getting one from fronted axios.get("URL", { header: { Authorization: token}})
  //Another is from postman req.cookies.token
  const token = req.headers.authorization || req.cookies.token;

  console.log(
    "authonticated user from backend++++++++++++++++++++++++++++++++++++++++++ ",
    req.headers.authorization
  );
  // console.log(req.cookies.token);

  // console.log(token);

  if (!token) {
    return next(
      new ErrorHandler("Please Login First ........................")
    );
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedData);
  req.user = await User.findById(decodedData.id);

  console.log(req.user);

  // console.log(req.user);
  next(); //FOR FURTHER PROCESS ACCESSING
};

// ==============================================================================================================================================================================
// ==============================================================================================================================================================================

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
