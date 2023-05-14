import React from "react";
import ProductList from "../../Products/ProductList/product_list";
import Header from "../../Header_title/title_header";
import "./product_search.css";

// import { useParams } from "react-router-dom";

const ProductSearch = () => {
  // let { keyword } = useParams();
  // console.log(keyword);
  return (
    <div className="productSearch">
      <Header header="PRODUCT FEATURES" />
      <ProductList />
    </div>
  );
};

export default ProductSearch;
