import React from "react";
import "../Home/home.css";
import Header from "../Product/title_header";
import ProductList from "../Product/product_list.js";
import ContactUsPage from "../contact";
// import Footer from "../Footer/footer";

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

      <div className="header">
        <div>
          <Header header="Featured Product" />
        </div>

        <div className="product_card">
          <ProductList />
        </div>
      </div>

      <div className="header">
        <div>
          <Header header="Contact Us" />
        </div>

        <div className="product_card">
          <ContactUsPage />
        </div>
      </div>
    </div>
  );
};

export default Home;
