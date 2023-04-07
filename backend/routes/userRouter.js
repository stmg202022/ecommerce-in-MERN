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
  getSingleUser,
  updateUserRole,
  adminDeleteUser,
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
router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizRoles("admin"),
  getAllUsers
);
router.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizRoles("admin"),
  getSingleUser
);
router.put(
  "/admin/update/userrole/:id",
  isAuthenticatedUser,
  authorizRoles("admin"),
  updateUserRole
);
router.delete(
  "/admin/delete/user/:id",
  isAuthenticatedUser,
  authorizRoles("admin"),
  adminDeleteUser
);

exports.router = router;
