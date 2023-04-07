const User = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");

//user REGISTER
exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = new User({
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

//user LOGIN
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

//Forgot Password
exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  //if user found then we need resetToken
  const resetToken = await user.getResetpasswordToken(); //await

  //==============================================================
  // console.log(resetToken);

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = ` Your password reset token is :- \n\n ${resetPasswordUrl} \n\nif you have not requested this email then please ignore it. `;

  //==================================================================
  // console.log(resetPasswordUrl);

  try {
    await sendEmail({
      //to
      email: user.email,
      subject: `CompanyName Password Recovery.`,
      message,
      // message: message,
    });

    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} Successfully.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
};

//Reset Password
exports.resetPassword = async (req, res, next) => {
  //

  console.log(req.params.token);

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token) // getting back to resetToken
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  // console.log(user);

  if (!user) {
    return next(
      new ErrorHandler(
        "RESET PASSWORD TOKEN IS INVALID OR HAS BEEN EXPIRED.",
        404
      )
    );
  } else if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("PASSWORD DOES NOT MATCH", 400));
  } else {
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    user.save().then((result) => {
      sendToken(result, 200, res);
    });
  }

  // console.log(user);
};

//get USER DETAILS
exports.getUserDetails = async (req, res, next) => {
  const user = await User.findById(req.user.id); //user.id can be get when login success only

  res.status(200).json({
    success: true,
    user,
  });
};

//user CHANGE/update PASSWORD
exports.userChangePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  //THIS comparePassword is userSchema.methods.comparePassword
  const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatch) {
    return await next(new ErrorHandler("Old password is Incorrect.", 401));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return await next(new ErrorHandler("Confirm Password Not Match.", 401));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
};

//user CHANGE/update profile // We will add cloudinary later
exports.userChangeProfile = async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
};

//get ALLUSERS
exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    users,
  });
};
