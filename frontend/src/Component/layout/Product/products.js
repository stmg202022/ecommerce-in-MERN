import React from "react";
import ProductList from "./product_list";
import Header from "../Header_title/title_header";
import "./products.css";
// import { useDispatch } from "react-redux";
// import { getProducts } from "../../../Redux/Actions/productActions";

import Footer from "../Footer/footer";

const Product = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch]);

  return (
    <div id="products" className="products">
      <div>
        <Header header="Featured Product" />
      </div>

      <div>
        <ProductList />
      </div>

      <Footer />
    </div>
  );
};

export default Product;
