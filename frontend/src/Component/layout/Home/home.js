import React from "react";
import "../Home/home.css";
import Header from "../Header_title/title_header";
// import Features from "../Product/product_features/features";
// import ProductList from "../Product/product_list.js";

import Footer from "../Footer/footer";
import ProductList from "../Products/ProductList/product_list";

const Home = () => {
  return (
    <div id="home">
      <div className="home">
        <div className="hero">
          <h4>Welcome</h4>
          <div>
            <h1>FIND AMAZING PRODUCT AS YOU WANT!</h1>
          </div>
        </div>
      </div>

      <div>
        <div>
          <Header header="Featured Product" />
        </div>

        <div className="content">
          <ProductList />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
