import React, { Fragment, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "../Navbar/navbar.css";

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

// function isToken() {
//   // Add your logic to check if the user is authenticated
//   // Return true if authenticated, false otherwise
//   return document.cookie ? true : false;
// }

const Navbar = () => {
  const [burger, setBurger] = useState(true);

  const { isAuthenticated, user } = useSelector((state) => state.users);

  console.log("user==================================", user, isAuthenticated);

  const showBurger = () => {
    setBurger(!burger);
  };

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

              {/* <div className="burger-main">
                <Link
                  to="#"
                  onClick={showBurger}
                  className={burger ? "burger" : "burger active"}
                >
                  <FaIcons.FaBars style={{ color: "wheat" }} />
                </Link>
              </div> */}

              {/* <div
                className={burger ? "second_navbar" : "second_navbar active"}
              >
                <Link
                  to="#"
                  className={burger ? "cross" : "cross active"}
                  onClick={showBurger}
                >
                  <AiIcons.AiOutlineClose style={{ color: "wheat" }} />
                </Link>
                <h1>this is second_navbar</h1>
              </div> */}
            </div>
          </div>
          <Routes>
            <Route exact path="/" element={<Home />} />
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
