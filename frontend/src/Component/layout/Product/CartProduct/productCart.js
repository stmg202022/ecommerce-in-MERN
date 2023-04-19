import React from "react";
import "../CartProduct/productCart.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ rounded, clickable, product }) => {
  const { _id, name, images, price, description } = product;

  const options = {
    color: "black",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
    edit: true,
    value: 3,
  };

  return (
    <Link
      to={_id}
      onClick={() => console.log(_id)}
      style={{ margin: "15px", flexBasis: "20%", textDecoration: "none" }}
      className={`card-wrapper ${rounded ? "rounded" : ""} ${
        clickable ? "clickable" : ""
      }`}
    >
      <div className="card-header">{name}</div>
      <img className="card-image" src={images[0].url} alt="Card" />
      <div className="card-content">{description} </div>
      <div className="card-footer">
        <div>
          <ReactStars {...options} />
          <span>(230 reviews)</span>
        </div>
        <div className="card-footer">NRS:{price}/-</div>
      </div>
    </Link>
  );
};

export default ProductCard;
