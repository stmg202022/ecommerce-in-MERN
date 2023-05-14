import React from "react";

import Header from "../Header_title/title_header";
import Footer from "../Footer/footer";

import ProductList from "./ProductList/product_list";

import "./product_home.css";

const ProductHome = () => {
  return (
    <div>
      <div id="products" className="products">
        <div>
          <Header header="Featured Product" />
        </div>
        <div>
          {/* <Features /> */}
          <ProductList />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ProductHome;
