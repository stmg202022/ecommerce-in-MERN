import React, { Fragment, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "../Navbar/navbar.css";

// import axios from "axios";

import { useSelector } from "react-redux";

import Home from "../layout/Home/home";
import About from "../layout/About/about";
import LoginSignUp from "../user/userLoginSignUp/userLoginSignUp";
import Contact from "../layout/Contact/contact";
import Search from "../layout/Search/search";
import NotFound from "../layout/NotFount/notFound.js";

import Products from "../layout/Products/product_home";
import ProductSearch from "../../Component/layout/Products/ProductSearch/product_search";
import ProductDetails from "../layout/Products/ProductDetail/product_details";

import Cart from "../layout/Cart/cart.js";
import Shipping from "../layout/Shipping/shipping";
import ComfirmOrder from "../layout/ConfirmOrder/confirmOrder";
// import Payment from "../layout/Payment/payment";
import Payment from "../layout/Khalti/khalti";
import Success from "../layout/Success/success.js";

import Account from "../layout/UserAccount/account";
import UpdateProfile from "../user/updateProfile/userUpdateProfile";
import UpdatePassword from "../user/updatePassword/userUpdatePassword.js";

import UserOptions from "../layout/UserOptions/options";

import { IconContext } from "react-icons";
import * as CgIcons from "react-icons/cg";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import meroshop from "../../images/meroshop.png";

import { linkData } from "../linkData/linkData";
import ForgotPassword from "../user/forgotPassword/forgotPassword";
import ResetPassword from "../user/resetPassword/resetPassword";

//All are for stripe payments
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const Navbar = () => {
  const [burger, setBurger] = useState(true);
  const { isAuthenticated, user } = useSelector((state) => state.users);
  const [stripeApiKey, setStripeApiKey] = useState("");

  console.log("user==================================", user, isAuthenticated);

  const getStripeApiKey = async () => {
    try {
      const cookies = document.cookie.split(";");

      let token = "";
      cookies.forEach((cookie) => {
        const [name, value] = cookie.trim().split("=");

        if (name === "token") {
          token = value;
        }
      });

      const { data } = await axios.get(
        "http://localhost:8080/api/v1/stripeapikey",
        {
          headers: {
            authorization: token,
          },
        }
      );

      // console.log("the stripeKey from data is", data.stripeKey);
      const stripeKey = data.stripeKey;

      if (stripeKey) {
        setStripeApiKey(stripeKey);
      } else {
        console.log("Stripe key not found in API response");
      }
    } catch (error) {
      console.error("Failed to fetch Stripe API key:", error);
    }
  };

  useEffect(() => {
    getStripeApiKey();
  }, []);

  const showBurger = () => {
    setBurger(!burger);
  };

  useEffect(() => {
    if (stripeApiKey) {
      const stripePromise = loadStripe(stripeApiKey);
      setStripePromise(stripePromise);
    }
  }, [stripeApiKey]);

  const [stripePromise, setStripePromise] = useState(null);

  // const stripePromise = loadStripe(stripeApiKey);

  return (
    <Router>
      <Fragment>
        <IconContext.Provider value={{ color: "black" }}>
          <div>
            <div className="navHeader">
              <div>
                <div
                  className={
                    burger ? " navBurger hideCross" : " navBurger showCross"
                  }
                  onClick={showBurger}
                >
                  <FaIcons.FaBars style={{ color: "wheat" }} />
                </div>
                <div
                  className={
                    burger ? "navBurger showCross" : "navBurger hideCross"
                  }
                  onClick={showBurger}
                >
                  <AiIcons.AiOutlineClose style={{ color: "wheat" }} />
                </div>
              </div>

              <div className="userOptions">
                {isAuthenticated && <UserOptions user={user} />}
              </div>
            </div>

            <div className={burger ? "navbar" : " navbar active"}>
              <div className="left-navbar">
                <img src={meroshop} alt="" style={{ width: "80px" }} />
              </div>
              <div className="right-navbar">
                <nav>
                  <ul>
                    {linkData.map((item, index) => {
                      if (isAuthenticated && item.title === "Login") {
                        // item.title = "Logout";
                        // item.path = "/logout";
                        // return (
                        //   <li key={index} className={item.cName}>
                        //     <Link to={item.path}>
                        //       <span>{item.title}</span>
                        //     </Link>
                        //   </li>
                        // );

                        return null;
                      }

                      return (
                        <li
                          key={index}
                          className={item.cName}
                          onClick={showBurger}
                        >
                          <Link to={item.path}>
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
              <div style={{ width: "40px" }}>
                <Link to="products/search" onClick={showBurger}>
                  <CgIcons.CgSearch />
                </Link>
              </div>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />

            <Route path="/products" element={<Products />} />
            <Route path="/products/search" element={<Search />} />
            <Route path="/products/:keyword" element={<ProductSearch />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order/confirm" element={<ComfirmOrder />} />
            <Route
              path="/payment/process/*"
              element={
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              }
            />
            <Route path="/success" element={<Success />} />

            <Route
              path="/account"
              element={isAuthenticated ? <Account /> : <Navigate to="/login" />}
            />

            <Route
              path="/me/update"
              element={
                isAuthenticated ? <UpdateProfile /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/password/update"
              element={
                isAuthenticated ? <UpdatePassword /> : <Navigate to="/login" />
              }
            />

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </IconContext.Provider>
      </Fragment>
    </Router>
  );
};

export default Navbar;
