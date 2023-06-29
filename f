[1mdiff --git a/backend/config/config.env b/backend/config/config.env[m
[1mindex f5d404a..22c9926 100644[m
[1m--- a/backend/config/config.env[m
[1m+++ b/backend/config/config.env[m
[36m@@ -12,7 +12,7 @@[m [mSMPT_SERVICE = gmail[m
 [m
 SMPT_EMAIL = stmg202023@gmail.com[m
 [m
[31m-SMPT_PASSWORD = mrgolaombpcpumin[m
[32m+[m[32mSMPT_PASSWORD = yxwjmdmaaichugde[m
 [m
 [m
 [m
[1mdiff --git a/backend/controllers/userController.js b/backend/controllers/userController.js[m
[1mindex 7d1ae40..51510de 100644[m
[1m--- a/backend/controllers/userController.js[m
[1m+++ b/backend/controllers/userController.js[m
[36m@@ -103,6 +103,11 @@[m [mexports.logOut = catchAsyncError(async (req, res, next) => {[m
   });[m
 });[m
 [m
[32m+[m[32m//====================================================================================================================================================================[m
[32m+[m[32m//====================================================================================================================================================================[m
[32m+[m[32m//====================================================================================================================================================================[m
[32m+[m[32m//====================================================================================================================================================================[m
[32m+[m
 //FORGOT PASSWORD[m
 exports.forgotPassword = catchAsyncError(async (req, res, next) => {[m
   const user = await User.findOne({ email: req.body.email });[m
[36m@@ -113,10 +118,10 @@[m [mexports.forgotPassword = catchAsyncError(async (req, res, next) => {[m
 [m
   console.log(user);[m
   //if user found then we need resetToken[m
[31m-  const resetToken = await user.getResetpasswordToken(); //await[m
[32m+[m[32m  const resetToken = await user.getResetpasswordToken(); //=>this fun is returning the resetToken //await  //resetPasswordToken[m
 [m
   //==============================================================[m
[31m-  // console.log(resetToken);[m
[32m+[m[32m  console.log("token get is::::::::::::", resetToken);[m
 [m
   await user.save({ validateBeforeSave: false });[m
 [m
[36m@@ -124,12 +129,14 @@[m [mexports.forgotPassword = catchAsyncError(async (req, res, next) => {[m
     "host"[m
   )}/api/v1/password/reset/${resetToken}`;[m
 [m
[31m-  const message = ` Your password reset token is :- \n\n ${resetPasswordUrl} \n\nif you have not requested this email then please ignore it. `;[m
[32m+[m[32m  console.log(resetPasswordUrl);[m
[32m+[m
[32m+[m[32m  const message = ` Your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then please ignore it. `;[m
 [m
   //==================================================================[m
   // console.log(resetPasswordUrl);[m
 [m
[31m-  // console.log(message);[m
[32m+[m[32m  console.log("message is::::::::::::::::::::", message);[m
 [m
   try {[m
     await sendEmail({[m
[36m@@ -208,6 +215,12 @@[m [mexports.getUserDetails = catchAsyncError(async (req, res, next) => {[m
   });[m
 });[m
 [m
[32m+[m[32m// =======================================================================================================================================================================================[m
[32m+[m[32m// =======================================================================================================================================================================================[m
[32m+[m[32m// =======================================================================================================================================================================================[m
[32m+[m[32m// =======================================================================================================================================================================================[m
[32m+[m[32m// =======================================================================================================================================================================================[m
[32m+[m[32m// =======================================================================================================================================================================================[m
 // =======================================================================================================================================================================================[m
 [m
 //user CHANGE/update PASSWORD[m
[1mdiff --git a/backend/utils/sendEmail.js b/backend/utils/sendEmail.js[m
[1mindex abf8dca..6657ef4 100644[m
[1m--- a/backend/utils/sendEmail.js[m
[1m+++ b/backend/utils/sendEmail.js[m
[36m@@ -3,9 +3,9 @@[m [mconst nodeMailer = require("nodemailer");[m
 const sendEmail = async (options) => {[m
   //CREATE TRANSPORTER[m
   const transporter = nodeMailer.createTransport({[m
[31m-    // host: "smtp.gmail.com",[m
[31m-    // port: 465,[m
[31m-    service: process.env.SMPT_SERVICE, //simple mail tramsfer protocal[m
[32m+[m[32m    host: "smtp.gmail.com",[m
[32m+[m[32m    port: 465,[m
[32m+[m[32m    secure: true,[m
     auth: {[m
       user: process.env.SMPT_EMAIL,[m
       pass: process.env.SMPT_PASSWORD,[m
[1mdiff --git a/frontend/src/Component/Navbar/navbar.js b/frontend/src/Component/Navbar/navbar.js[m
[1mindex 45a940c..e2415d6 100644[m
[1m--- a/frontend/src/Component/Navbar/navbar.js[m
[1m+++ b/frontend/src/Component/Navbar/navbar.js[m
[36m@@ -23,6 +23,7 @@[m [mimport ProductDetails from "../layout/Products/ProductDetail/product_details";[m
 [m
 import Account from "../layout/UserAccount/account";[m
 import UpdateProfile from "../user/updateProfile/userUpdateProfile";[m
[32m+[m[32mimport UpdatePassword from "../user/updatePassword/userUpdatePassword.js";[m
 [m
 import UserOptions from "../layout/UserOptions/options";[m
 [m
[36m@@ -173,6 +174,12 @@[m [mconst Navbar = () => {[m
                 isAuthenticated ? <UpdateProfile /> : <Navigate to="/login" />[m
               }[m
             />[m
[32m+[m[32m            <Route[m
[32m+[m[32m              path="/password/update"[m
[32m+[m[32m              element={[m
[32m+[m[32m                isAuthenticated ? <UpdatePassword /> : <Navigate to="/login" />[m
[32m+[m[32m              }[m
[32m+[m[32m            />[m
 [m
             <Route path="/*" element={<NotFound />} />[m
           </Routes>[m
[1mdiff --git a/frontend/src/Component/user/updateProfile/userUpdateProfile.js b/frontend/src/Component/user/updateProfile/userUpdateProfile.js[m
[1mindex 17dbcef..1b3aa0f 100644[m
[1m--- a/frontend/src/Component/user/updateProfile/userUpdateProfile.js[m
[1m+++ b/frontend/src/Component/user/updateProfile/userUpdateProfile.js[m
[36m@@ -25,6 +25,7 @@[m [mimport "react-toastify/dist/ReactToastify.css";[m
 //When login Success...[m
 import { useNavigate } from "react-router-dom";[m
 import { UPDATE_PROFILE_RESET } from "../../../Redux/Constants/userConstant";[m
[32m+[m
 const UpdateProfile = () => {[m
   const dispatch = useDispatch();[m
   const { user } = useSelector((state) => state.users);[m
[36m@@ -38,10 +39,10 @@[m [mconst UpdateProfile = () => {[m
 [m
   const { loading, isUpdated, error } = useSelector((state) => state.profile);[m
 [m
[31m-  console.log([m
[31m-    "*********************************************************",[m
[31m-    loading[m
[31m-  );[m
[32m+[m[32m  // console.log([m
[32m+[m[32m  //   "*********************************************************",[m
[32m+[m[32m  //   loading[m
[32m+[m[32m  // );[m
 [m
   const navigate = useNavigate();[m
 [m
[1mdiff --git a/frontend/src/Redux/Actions/userActions.js b/frontend/src/Redux/Actions/userActions.js[m
[1mindex 18e63e9..1d1501a 100644[m
[1m--- a/frontend/src/Redux/Actions/userActions.js[m
[1m+++ b/frontend/src/Redux/Actions/userActions.js[m
[36m@@ -16,6 +16,12 @@[m [mimport {[m
   UPDATE_PROFILE_SUCCESS,[m
   UPDATE_PROFILE_FAIL,[m
   //[m
[32m+[m
[32m+[m[32m  //[m
[32m+[m[32m  UPDATE_PASSWORD_REQUEST,[m
[32m+[m[32m  UPDATE_PASSWORD_SUCCESS,[m
[32m+[m[32m  UPDATE_PASSWORD_FAIL,[m
[32m+[m[32m  //[m
   CLEAR_ERRORS,[m
 } from "../Constants/userConstant";[m
 [m
[36m@@ -191,6 +197,52 @@[m [mexport const userChangeProfile = (updateData) => async (dispatch) => {[m
   }[m
 };[m
 [m
[32m+[m[32m//USER EDIT PASSWORD[m
[32m+[m[32mexport const userChangePassword = (updateData) => async (dispatch) => {[m
[32m+[m[32m  try {[m
[32m+[m[32m    dispatch({ type: UPDATE_PASSWORD_REQUEST });[m
[32m+[m
[32m+[m[32m    const cookie = document.cookie;[m
[32m+[m[32m    // console.log("the token is" + cookie);[m
[32m+[m
[32m+[m[32m    const token = cookie.split("=")[1];[m
[32m+[m
[32m+[m[32m    console.log({ token });[m
[32m+[m
[32m+[m[32m    // console.log([m
[32m+[m[32m    //   "update password Data are]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]",[m
[32m+[m[32m    //   updateData.get("oldPassword") +[m
[32m+[m[32m    //     updateData.get("newPassword") +[m
[32m+[m[32m    //     updateData.get("confirmPassword")[m
[32m+[m[32m    // );[m
[32m+[m
[32m+[m[32m    const res = await axios.put([m
[32m+[m[32m      "http://localhost:8080/api/v1/password/update",[m
[32m+[m[32m      updateData, // Pass updateData as the request body[m
[32m+[m[32m      {[m
[32m+[m[32m        headers: {[m
[32m+[m[32m          authorization: token,[m
[32m+[m[32m        },[m
[32m+[m[32m      }[m
[32m+[m[32m    );[m
[32m+[m
[32m+[m[32m    // console.log([m
[32m+[m[32m    //   "??????????????????????????????????????????????????????????????????",[m
[32m+[m[32m    //   res[m
[32m+[m[32m    // );[m
[32m+[m
[32m+[m[32m    await dispatch({[m
[32m+[m[32m      type: UPDATE_PASSWORD_SUCCESS,[m
[32m+[m[32m      payload: res.data.success,[m
[32m+[m[32m    });[m
[32m+[m[32m  } catch (error) {[m
[32m+[m[32m    dispatch({[m
[32m+[m[32m      type: UPDATE_PASSWORD_FAIL,[m
[32m+[m[32m      payload: error.response.data.message,[m
[32m+[m[32m    });[m
[32m+[m[32m  }[m
[32m+[m[32m};[m
[32m+[m
 //CLEAR-USER-ERRORS[m
 export const clearUserErrors = () => async (dispatch) => {[m
   dispatch({ type: CLEAR_ERRORS });[m
[1mdiff --git a/frontend/src/Redux/Constants/userConstant.js b/frontend/src/Redux/Constants/userConstant.js[m
[1mindex b99f675..495510a 100644[m
[1m--- a/frontend/src/Redux/Constants/userConstant.js[m
[1m+++ b/frontend/src/Redux/Constants/userConstant.js[m
[36m@@ -18,4 +18,9 @@[m [mexport const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";[m
 export const UPDATE_PROFILE_RESET = "UPDATE_PROFILE_RESET";[m
 export const UPDATE_PROFILE_FAIL = "UPDATE_PROFILE_FAIL";[m
 [m
[32m+[m[32mexport const UPDATE_PASSWORD_REQUEST = "UPDATE_PASSWORD_REQUEST";[m
[32m+[m[32mexport const UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS";[m
[32m+[m[32mexport const UPDATE_PASSWORD_RESET = "UPDATE_PASSWORD_RESET";[m
[32m+[m[32mexport const UPDATE_PASSWORD_FAIL = "UPDATE_PASSWORD_FAIL";[m
[32m+[m
 export const CLEAR_ERRORS = "CLEAR_ERRORS";[m
[1mdiff --git a/frontend/src/Redux/Reducer/userReducer.js b/frontend/src/Redux/Reducer/userReducer.js[m
[1mindex 36b9990..706b610 100644[m
[1m--- a/frontend/src/Redux/Reducer/userReducer.js[m
[1m+++ b/frontend/src/Redux/Reducer/userReducer.js[m
[36m@@ -10,12 +10,18 @@[m [mimport {[m
   LOAD_USER_FAIL,[m
   LOGOUT_SUCCESS,[m
   LOGOUT_FAIL,[m
[31m-  //[m
[32m+[m[32m  //FOR UPDATING PROFILE[m
   UPDATE_PROFILE_REQUEST,[m
   UPDATE_PROFILE_SUCCESS,[m
   UPDATE_PROFILE_RESET,[m
   UPDATE_PROFILE_FAIL,[m
   //[m
[32m+[m[32m  //FOR UPDATING PASSWORD[m
[32m+[m[32m  UPDATE_PASSWORD_REQUEST,[m
[32m+[m[32m  UPDATE_PASSWORD_SUCCESS,[m
[32m+[m[32m  UPDATE_PASSWORD_FAIL,[m
[32m+[m[32m  UPDATE_PASSWORD_RESET,[m
[32m+[m[32m  //[m
   CLEAR_ERRORS,[m
 } from "../Constants/userConstant";[m
 [m
[36m@@ -85,34 +91,34 @@[m [mexport const userReducer = (state = { user: {} }, action) => {[m
 export const profileReducer = (state = {}, action) => {[m
   switch (action.type) {[m
     case UPDATE_PROFILE_REQUEST:[m
[32m+[m[32m    case UPDATE_PASSWORD_REQUEST:[m
       return {[m
         ...state,[m
         loading: true,[m
       };[m
 [m
     case UPDATE_PROFILE_SUCCESS:[m
[32m+[m[32m    case UPDATE_PASSWORD_SUCCESS:[m
       return {[m
         ...state,[m
         loading: false,[m
[31m-        isUpdated: action.payload,[m
[32m+[m[32m        isUpdated: action.payload, //res.data.success[m
       };[m
 [m
[31m-    case UPDATE_PROFILE_RESET:[m
[32m+[m[32m    case UPDATE_PROFILE_FAIL:[m
[32m+[m[32m    case UPDATE_PASSWORD_FAIL:[m
[32m+[m[32m      // console.log(action.payload);[m
       return {[m
         ...state,[m
         loading: false,[m
[31m-        // isAuthenticated: true,[m
[31m-        isUpdated: false,[m
[32m+[m[32m        error: action.payload,[m
       };[m
 [m
[31m-    case UPDATE_PROFILE_FAIL:[m
[31m-      // console.log(action.payload);[m
[32m+[m[32m    case UPDATE_PROFILE_RESET:[m
[32m+[m[32m    case UPDATE_PASSWORD_RESET:[m
       return {[m
         ...state,[m
[31m-        loading: false,[m
[31m-        // isAuthenticated: false,[m
[31m-        isUpdated: false, // problem[m
[31m-        error: action.payload,[m
[32m+[m[32m        isUpdated: false,[m
       };[m
 [m
     case CLEAR_ERRORS:[m
