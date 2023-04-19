import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { linkData } from "../Component/linkData/linkData";
import "../../src/App.css";
import { IconContext } from "react-icons";
import meroshop from "../images/meroshop.png";
// import { Container } from "@mui/material";
import "../Component/navbar.css";

function Navbar() {
  const [burger, setBurger] = useState(true);

  const showBurger = () => {
    setBurger(!burger);
    console.log(burger);
  };

  return (
    <>
      <IconContext.Provider value={{ color: "black" }}>
        <div>
          <div className="navbar">
            <div className="left-navbar">
              <img src={meroshop} alt="" style={{ width: "80px" }} />
            </div>
            <div className="right-navbar">
              <ul>
                {linkData.map((item, index) => {
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
    </>
  );
}

export default Navbar;
