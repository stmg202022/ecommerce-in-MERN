const User = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");

exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await new User({
    name,
    email,
    password,
    avatar: {
      public_id: "sample public_id",
      url: "sample url",
    },
  });

  //THIS getJwtToken is userSchema.methods.getJwtToken()
  // const token = user.getJwtToken();

  user
    .save()
    .then((result) => {
      sendToken(result, 200, res);
      // res.status(200).json({
      //   success: true,
      //   user: result,
      //   token,
      // });
    })
    .catch((err) => {
      // res.status(500).json({
      //   success: false,
      //   message: `Failed to create user `,
      // });

      next(
        new ErrorHandler(
          "ALREADY HAVE BEEN REGISTER BY USING THIS EMAIL OR PASSWORD",
          401
        )
      );
    });
};

exports.userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Password.", 404));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return await next(new ErrorHandler("Invalid Email or Password.", 401));
  }
  //THIS comparePassword is userSchema.methods.comparePassword
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return await next(new ErrorHandler("Invalid Eamil or Password.", 401));
  }

  // const token = await user.getJwtToken();

  // res.status(200).json({
  //   success: true,
  //   token,
  // });

  sendToken(user, 200, res);
};

//LOGOUT Case
exports.logOut = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "LOGOUT SUCCESS",
  });
};
