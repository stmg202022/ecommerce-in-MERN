import React from "react";
import "./product.css";

const Header = ({ header }) => {
  return (
    <div>
      <div id="product" className="product_title">
        <div>
          <h2>{header}</h2>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Header;
