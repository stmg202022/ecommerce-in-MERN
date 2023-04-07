const express = require("express");
const {
  registerUser,
  userLogin,
  logOut,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser); //create
router.post("/login", userLogin);
router.post("/logout", logOut);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

exports.router = router;
