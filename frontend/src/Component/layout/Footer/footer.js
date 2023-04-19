import React from "react";
import Container from "@mui/material/Container";

import ".././Footer/footer.css";
import Playstore from "../../../images/googlestore2.png";
import Appstore from "../../../images/appstore.png";
import { AiFillInstagram, AiFillYoutube, AiFillFacebook } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer">
      <Container maxWidth="lg">
        <div className="footer_parent">
          <div className="">
            <h4>Download Our App</h4>
            <p>Download Our App for Android and IOS Mobile Phone</p>
            <div>
              <img
                alt=""
                style={{ width: "150px", height: "50px" }}
                src={Playstore}
              />
              <img
                src={Appstore}
                alt=""
                style={{ width: "150px", height: "50px" }}
              />
            </div>
          </div>

          <div className="">
            <h1>Ecommerce</h1>
            <p>High Quality is Our First Priority</p>
            <p>Copyright 2023 &copy; SamsonTmg</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <h4>Follow Us On</h4>
            <a href="#insta">
              <AiFillInstagram
                style={{ width: "100px", height: "50px", color: "red" }}
              />
            </a>
            <a href="#facebook">
              <AiFillFacebook
                style={{ width: "100px", height: "50px", color: "darkblue" }}
              />
            </a>
            <a href="#youtube">
              <AiFillYoutube
                style={{ width: "100px", height: "50px", color: "red" }}
              />
            </a>
          </div>
        </div>
      </Container>
    </div>

    // <div className="footer">
    //   <Container maxWidth="xl">

    //     <div className="footer_parent">
    //       <div className="footer_child">
    //         <h4>Download Our App</h4>
    //         <p>Download Our App for Android and IOS Mobile Phone</p>
    //         <div>
    //           <img
    //             src={Playstore}
    //             alt=""
    //             style={{ width: "150px", height: "50px" }}
    //           />
    //           <img
    //             src={Appstore}
    //             alt=""
    //             style={{ width: "150px", height: "50px" }}
    //           />
    //         </div>
    //       </div>
    //       <div className="footer_child">
    //         <h1>Ecommerce</h1>
    //         <p>High Quality is Our First Priority</p>
    //         <p>Copyright 2023 &copy; SamsonTmg</p>
    //       </div>

    //       <div>
    //         <h4>Follow Us On</h4>

    //         <a href="#insta">
    //           <AiFillInstagram
    //             style={{ width: "100px", height: "50px", color: "red" }}
    //           />
    //         </a>
    //         <a href="#youtube">
    //           <AiFillYoutube
    //             style={{ width: "100px", height: "50px", color: "red" }}
    //           />
    //         </a>
    //         <a href="#facebook">
    //           <AiFillFacebook
    //             style={{ width: "100px", height: "50px", color: "darkblue" }}
    //           />
    //         </a>
    //       </div>
    //     </div>
    //   </Container>
    // </div>
  );
};

export default Footer;
