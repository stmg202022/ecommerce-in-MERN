import React from "react";
import ProductCart from "./CartProduct/productCart";
// import cartMedia from "../../../images/meroshop.png";

const ProductList = () => {
  const product = {
    _id: 1,
    name: "Product 1",
    images: [
      {
        url: "https://static-01.daraz.com.np/p/517c4e17e97b3ae0628c1cc54ccbfbe8.jpg",
      },
    ],
    price: 2000,
    description: "product description goes here...",
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <ProductCart rounded={true} clickable={true} product={product} />
        <ProductCart rounded={true} product={product} />
        <ProductCart rounded={true} product={product} />
        <ProductCart rounded={true} product={product} />
        <ProductCart rounded={true} product={product} />
        <ProductCart rounded={true} product={product} />
        <ProductCart rounded={true} product={product} />
        <ProductCart rounded={true} product={product} />
        <ProductCart rounded={true} product={product} />
        <ProductCart rounded={true} product={product} />
        <ProductCart rounded={true} product={product} />
      </div>
    </div>
  );
};

export default ProductList;
