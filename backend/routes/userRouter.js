const express = require("express");
const {
  registerUser,
  userLogin,
  logOut,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser); //create
router.post("/login", userLogin);
router.post("/logout", logOut);

exports.router = router;
