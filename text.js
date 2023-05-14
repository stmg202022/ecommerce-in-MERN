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

// This is on login_form branch.
