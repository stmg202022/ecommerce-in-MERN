//========================
// userSchema.pre('save', function (next) {
//   const user = this;

//   if (user.isModified('password') && user.jwt) {

//     jwt.verify(user.jwt, process.env.JWT_SECRET, (err, decoded) => {

//       if (decoded._id !== user._id || err) {
//         return next(new Error('Invalid JWT'));
//       }

//       bcrypt.hash(user.password, 10, (err, hash) => {
//         if (err) {
//           return next(err);
//         }

//         user.password = hash;
//         next();
//       });
//     });
//   } else {
//     next();
//   }
// });

// ============================================================================

// npm install --save react-alert react-alert-template-basic

// {
//   resultPerPage < count && (
//     <div className="pagination">
//       <Pagination
//         activePage={currentPage} //1
//         itemsCountPerPage={resultPerPage} // 8 so, 20 /8 === 2 page and 4 product {1 } {2}
//         totalItemsCount={productsCount} //number of product 20
//         onChange={setCurrentPageNo}
//         nextPageText="Next"
//         prevPageText="Prev"
//         firstPageText="1st"
//         lastPageText="Last"
//         itemClass="page-item"
//         linkClass="page-link"
//         activeClass="pageItemActive"
//         activeLinkClass="pageLinkActive"
//       />
//     </div>
//   );
// }

// This is on master branch.

//1. Working on App.js
//2. backend> middleware > auth.js
//3. navbar.js
//4. App.js
//5. userActions.js //

//=======================================================================================================================================================================================
// //====================================================================

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// import {
//   loadStripe,
//   Elements,
//   CardNumberElement,
//   CardCvcElement,
//   CardExpiryElement,
//   useStripe,
// } from "@stripe/react-stripe-js";

// const [stripeApiKey, setStripeApiKey] = useState("");

// useEffect(() => {
//   getStripeApiKey();
// }, []);

// const fetchStripeApiKey = async () => {
//       try {
//         // Retrieve the token from the document.cookie
//         const cookies = document.cookie.split(";");
//         let token = "";
//         cookies.forEach((cookie) => {
//           const [name, value] = cookie.trim().split("=");
//           if (name === "token") {
//             token = value;
//           }
//         });

//         console.log(
//           "the token befor sending to get stripe Api keys is: ",
//           token
//         ); // Do whatever you need with the token

//         const { data } = await axios.get(
//           "http://localhost:8080/api/v1/stripeapikey",
//           {
//             headers: {
//               authorization: token,
//             },
//           }
//         );

//         console.log(
//           "))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))",
//           data.stripeKey
//         );
//       } catch (err) {
//         console.log(err.response.data.message);
//       }
//     };

//     fetchStripeApiKey();

// {
//   /* <Route
//               path="/payment/process"
//               element={
//                 <Elements stripe={loadStripe(stripeApiKey)}>
//                   <Payment />
//                 </Elements>
//               }
//             /> */
// }

//8:27 // 8: 47 // 9:10 //9: 31 // 11:15

//get user Details.
//update the user profile
//loginRegisterWithAuthentication
//change the writing of react-router-dom

//stripe testing indigrations
// 4242424242424242

// try {
//     let config = {
//       headers: {
//         Authorization: process.env.Khalti_SECRET_KEY,
//       },
//     };

//     const data = {
//       token: req.payload.token,
//       amount: req.payload.amount,
//     };

//     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>", data);

//     axios
//       .post("https://khalti.com/api/v2/payment/verify/", data, config)
//       .then((response) => {
//         console.log(response.data);
//         res.status(200).json({ success: true });
//       })
//       .catch((error) => {
//         console.log(error);
//         res
//           .status(500)
//           .json({ error: "An error occurred while verifying payment." });
//       });
//   } catch (error) {}

// https://admin.khalti.com

//===================================================================================================================================================
// PORT=8080

// DB_URL="mongodb://127.0.0.1:27017/ecommercedbs"

// JWT_SECRET = JHFDSHFAJHDFJHDSAKJLFHDGFHRTHGDJGNDBFD9FH

// JWT_EXPIRE = 5d

// COOKIE_DATE = 5

// SMPT_SERVICE = gmail

// SMPT_EMAIL = stmg202023@gmail.com

// SMPT_PASSWORD = yxwjmdmaaichugde

// CLOUDINARY_NAME = db2w3vlth
// CLOUDINARY_KEY = 138122956576733
// CLOUDINARY_API_SECRET = WcAwdYeqlGQ2yl_g00bX8Q11GT8

// FRONTEND_URL = "http://localhost:3000"

// Khalti_API_KEY = test_public_key_739f333174ad4688a10bcc99facf0701
// Khalti_SECRET_KEY = Key test_secret_key_a38d9e3a8c41407880f384c6ae4d8a49

// ..
