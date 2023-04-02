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
