import React, { useEffect } from "react";
import ProductCart from "./CartProduct/productCart";
import Loader from "../Loader/loader";
import { useSelector } from "react-redux";
import { getProducts } from "../../../Redux/Actions/productActions";
import { useDispatch } from "react-redux";
// import AlertDialog from "../Alert/alert";
import { clearError } from "../../../Redux/Actions/productActions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList = () => {
  const { loading, error, products } = useSelector(
    //productCount
    (state) => state.products
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(getProducts());
  }, [dispatch, error]);

  // console.log(error);

  // const product = {
  //   _id: 1,
  //   name: "Product 1",
  //   images: [
  //     {
  //       url: "https://static-01.daraz.com.np/p/517c4e17e97b3ae0628c1cc54ccbfbe8.jpg",
  //     },
  //   ],
  //   price: 2000,
  //   description: "product description goes here...",
  // };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        // : error ? (
        //   <AlertDialog error={error} />
        // )
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* <ProductCart rounded={true} clickable={true} product={products} /> */}
          {products &&
            products.map((product) => (
              <ProductCart rounded={true} product={product} key={product._id} />
            ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
