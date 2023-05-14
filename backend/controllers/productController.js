const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

//this file contain the functions of the all C R U D  and used mongoose shell for document
const ApiFeatures = require("../utils/apiFeature");

const Product = require("../model/productModel");

//CREATE
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = new Product(req.body);

  product
    .save()
    .then((result) => {
      // console.log(result);
      res.status(201).json({ result }); // can be seen in the body
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "product not created", //err.stack
      });

      // next(new ErrorHandler("PRODUCT NOT CREATED", "401"));
    });
});

// GET / READ / All products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  try {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    // console.log(req.query)
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);

    // let products = await apiFeature.query;

    // let filteredProductsCount = products.length;

    // apiFeature.pagination(resultPerPage);

    // products = await apiFeature.query;

    let products = await apiFeature.query;

    // console.log(products);

    // const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      // filteredProductsCount,
    });
  } catch (err) {
    next(new ErrorHandler(`error:${err}`));
  }
});

//GET ONE PRODUCT BY ID

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;

  // console.log(id);

  try {
    const product = await Product.findById(id);
    await res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    // res.status(500).json({ message: `PRODUCT NOT FOUND ${err}` });
    next(new ErrorHandler(`PRODUCT NOT FOUND`, 404));
  }
});

//UPDATE
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;

  try {
    const product = await Product.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: `PRODUCT NOT FOUND`,
    // });
    next(new ErrorHandler("PRODUCT NOT FOUND", 404));
  }

  // let product = await Product.findById(req.params.id); // _id = id

  // console.log(req.params.id);

  // if(!product){
  //     return res.status(500).json({
  //         success: false,
  //         message: "Product not found"
  //     })
  // }

  // product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true})
  // res.status(200).json(product)
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  try {
    const id = await req.params.id;
    const product = await Product.findOneAndDelete({ _id: id }); // require this conditions
    res.status(200).json({
      message: "Delete success",
      product,
    });
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: `PRODUCT NOT FOUND ${err}`,
    // });

    next(new ErrorHandler("PRODUCT NOT FOUND", 404));
  }
});

//create PRODUCT REVIEWS OR UPDATE THE REVIEWS (C/U)
exports.createProductReviews = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      //again and again review //update
      if (rev.user.toString() === req.user._id) {
        await((rev.rating = rating)), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    product,
  });
});

//get PRODUCT REVIEWS (R)
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("PRODUCT NOT FOUND", 404));
  }

  res.status(200).json({
    reviews: product.reviews,
  });
});

//delete PRODUCT REVIEWS (D)
exports.deleteProductReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("PRODUCT NOT FOUND", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / reviews.length;

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, numOfReviews },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({
    success: true,
  });
});
