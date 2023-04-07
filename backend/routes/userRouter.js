const express = require("express");
const {
  registerUser,
  userLogin,
  logOut,
  forgotPassword,
  resetPassword,
  getUserDetails,
  userChangePassword,
  userChangeProfile,
  getAllUsers,
} = require("../controllers/userController");
const router = express.Router();
const { isAuthenticatedUser, authorizRoles } = require("../middleware/auth");

router.post("/register", registerUser); //create
router.post("/login", userLogin);
router.post("/logout", logOut);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/me", isAuthenticatedUser, getUserDetails);
router.put("/password/update", isAuthenticatedUser, userChangePassword);
router.put("/me/update", isAuthenticatedUser, userChangeProfile);
router.get("/users", isAuthenticatedUser, authorizRoles("admin"), getAllUsers);

exports.router = router;
