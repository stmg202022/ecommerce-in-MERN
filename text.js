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

// <form
//             action=""
//             className="createProductForm"
//             encType="multipart/form-data"
//             onSubmit={updateProductSubmitHandler}
//           >
//             <h1>Update Product</h1>

//             <div>
//               <SpellcheckIcon />
//               <input
//                 type="text"
//                 placeholder="Product Name"
//                 required
//                 name="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>

//             <div>
//               <AttachMoneyIcon />
//               <input
//                 type="number"
//                 placeholder="Price rupee.."
//                 required
//                 name="price"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//               />
//             </div>

//             <div>
//               <DescriptionIcon />
//               <textarea
//                 rows="1"
//                 placeholder="Descriptions"
//                 required
//                 name="description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </div>

//             <div>
//               <AccountTreeIcon />
//               <select
//                 onChange={(e) => setCategory(e.target.value)}
//                 value={category}
//               >
//                 <option value="">Select Categories</option>
//                 {categories.map((cat) => {
//                   return (
//                     <option key={cat} value={cat}>
//                       {cat}
//                     </option>
//                   );
//                 })}
//                 {/* // */}
//               </select>
//             </div>

//             <div>
//               <StorageIcon />
//               <input
//                 type="number"
//                 placeholder="Stock"
//                 required
//                 value={stock}
//                 onChange={(e) => setStock(e.target.value)}
//               />
//             </div>

//             <div id="createProductFormFile">
//               <input
//                 type="file"
//                 name="avater"
//                 accept="image/*"
//                 multiple
//                 onChange={updateProductImageChange}
//               />
//             </div>

//             <div className="createProductFormImage" id="createProductFormImage">
//               {imagesPreview.map((image, index) => (
//                 <img key={index} src={image} alt="Avatar Preview " />
//               ))}
//             </div>

//             <Button
//               id="createProductBtn"
//               type="submit"
//               disabled={loading ? true : false}
//             >
//               UPDATE
//             </Button>
//           </form>

// ====================================================================================

// const id = req.params.id;
// let product = await Product.findById(req.params.id);
// let images = [];
// if (typeof req.body.images === "string") {
//   images.push(req.body.images);
// } else {
//   images = req.body.images;
// }
// if (images !== undefined) {
//   for (let i = 0; i < product.images.length; i++) {
//     await cloudinary.v2.uploader.destroy(product.images[i].public_id);
//   }
// } else {
//   next(new ErrorHandler("UPLOAD NEW IMAGES", 404));
// }
// let imageLink = [];
// for (let i = 0; i < images.length; i++) {
//   const result = await cloudinary.v2.uploader.upload(images[i], {
//     folder: "products",
//   });
//   imageLink.push({
//     public_id: result.public_id,
//     url: result.secure_url,
//   });
// }
// req.body.images = imageLink;
// console.log("this is image link", req.body.images);
// console.log("this is images link by cloudinary", imageLink);
// product = await Product.findByIdAndUpdate({ _id: id }, req.body, {
//   new: true,
// });
// console.log("updated product is this:", product);
// res.status(200).json({
//   success: true,
//   product,
// });

// =======================================================================================

// during passing same image without updateing images

// const id = req.params.id;

//     console.log(
//       "Product from frontend is this>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
//       req.body
//     );

//     let product = await Product.findById({ _id: id });

//     console.log("product from backend is this:", product);

//     const imagesFromFrontEnd = JSON.parse(req.body.images);

//     req.body.images = imagesFromFrontEnd;

//     product = await Product.findByIdAndUpdate({ _id: id }, req.body, {
//       new: true,
//     });

//     res.status(200).json({
//       success: true,
//       product,
//     });
