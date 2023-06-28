import React, { Fragment, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as CgIcons from "react-icons/cg";
import { Link } from "react-router-dom";
import { linkData } from "../linkData/linkData";
import "../../App.css";
import { IconContext } from "react-icons";
import meroshop from "../../images/meroshop.png";
import "../Navbar/navbar.css";
import { useSelector } from "react-redux";

import UserOptions from "../layout/UserOptions/options";

function Navbar() {
  console.log("..............................................from navbar");

  const [burger, setBurger] = useState(true);
  const { isAuthenticated, user } = useSelector((state) => state.users);

  const showBurger = () => {
    setBurger(!burger);
    console.log(burger);
  };

  // // =======================================================================problem ===================================
  // console.log(document.cookie);
  // const login = document.cookie ? true : false;
  // console.log("==================", login);

  console.log("---------------", isAuthenticated, user);

  // // =======================================================================problem ===================================

  return (
    <Fragment>
      <IconContext.Provider value={{ color: "black" }}>
        <div>
          <div className="navbar">
            <div className="left-navbar">
              <img src={meroshop} alt="" style={{ width: "80px" }} />
            </div>
            <div className="right-navbar">
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
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div style={{ width: "40px" }}>
              <Link to="products/search">
                <CgIcons.CgSearch />
              </Link>
            </div>

            <div>{isAuthenticated && <UserOptions user={user} />}</div>

            <div className="burger-main">
              <Link
                to="#"
                onClick={showBurger}
                className={burger ? "burger" : "burger active"}
              >
                <FaIcons.FaBars style={{ color: "wheat" }} />
              </Link>
            </div>

            <div className={burger ? "second_navbar" : "second_navbar active"}>
              <Link
                to="#"
                className={burger ? "cross" : "cross active"}
                onClick={showBurger}
              >
                <AiIcons.AiOutlineClose style={{ color: "wheat" }} />
              </Link>
              <h1>this is second_navbar</h1>
            </div>
          </div>
        </div>
      </IconContext.Provider>
    </Fragment>
  );
}

export default Navbar;

// ==========================================================================================================================
// ==========================================================================================================================
