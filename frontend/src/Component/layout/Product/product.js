import React from "react";
import ProductList from "./product_list";

const Product = () => {
  return (
    <div>
      <h1>Product</h1>
      <div style={{ marginTop: "100px" }}>
        <ProductList />
      </div>
    </div>
  );
};

export default Product;
