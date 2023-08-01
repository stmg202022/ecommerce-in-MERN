import React from "react";
// import ReactStars from "react-rating-stars-component";
import { Rating } from "@mui/material";
import profileImage from "../../../images/profileImage.jpg";
import "./review.css";
const ReviewCart = ({ review }) => {
  //   return <div>{/* <p>{JSON.stringify(review)}</p> */}</div>;
  // console.log(JSON.stringify(review, null, "\t"));

  // const options = {
  //   count: 5,
  //   size: window.innerWidth < 600 ? 20 : 25,
  //   isHalf: true,
  //   activeColor: "#ffd700",
  //   value: Number(review.rating),
  //   edit: false,
  // };

  const options = {
    size: "large",
    value: Number(review.rating),
    readOnly: true,
  };

  return (
    <div className="reviewCart">
      <img src={profileImage} alt="" style={{ width: "45%" }} />
      <p>
        <b>{review.name}</b>
      </p>
      {/* <ReactStars {...options} /> */}
      <Rating {...options} />

      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCart;
