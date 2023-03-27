//this file contain the functions of the all C R U D  and used mongoose shell for document
const ApiFeatures = require("../utils/apiFeature");

const Product = require("../model/productModel")

//CREATE
exports.createProduct = async (req, res, next) => {
    const product = await new Product(req.body)

    product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({ result }); // can be seen in the body
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err, //err.stack
      });
    });
}

// GET / READ / All products
exports.getAllProducts = async (req, res, next) => {

  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  // console.log(req.query)
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeature.query;
    // const products = await Product.find();
    res.status(200).json({
      success: true,
      products
    });
}

//GET ONE PRODUCT BY ID

exports.getProduct = async (req, res) =>{
  const id = req.params.id;
  try{
    const product = await Product.findById(id)
   await res.status(200).json({
    success: true,
    product,
    productCount,
   })
  }catch(err){
    res.status(500).json({message: `PRODUCT NOT FOUND ${err}`})
  }
}


//UPDATE
exports.updateProduct = async (req, res, next) => {

  try {

    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(id, req.body, {new: true});
    res.status(200).json(product);

  }catch(err){

    res.status(500).json({
      success: false,
      message: `PRODUCT NOT FOUND: ${err}`
    })

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

}

exports.deleteProduct = async (req, res, next) => {
  try {
    const id = await req.params.id;
    const product = await  Product.findOneAndDelete({_id : id});  // require this conditions
    res.status(200).json({
      message: "Delete success",
      product
    })
  }catch(err){
    res.status(500).json({
      success: false,
      message: `PRODUCT NOT FOUND ${err}`
    })
  }
}







