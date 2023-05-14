import React from "react";
// import ProductList from "./product_list";
import Header from "../Header_title/title_header";
import "./products.css";
// import { useDispatch } from "react-redux";
// import { getProducts } from "../../../Redux/Actions/productActions";

// import Features from "./product_features/features";

import Footer from "../Footer/footer";

const Products = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch]);

  return (
    <div>
      <div id="products" className="products">
        <div>
          <Header header="Featured Product" />
        </div>
        <div>
          {/* <Features /> */}
          {/* <ProductList /> */}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Products;
