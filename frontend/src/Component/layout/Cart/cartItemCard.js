import React from "react";
import "./CartItemCart.css";
import { Link } from "react-router-dom";
import { removeItemsFromCart } from "../../../Redux/Actions/cartActions";
import { useDispatch } from "react-redux";

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();

  const removeItem = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  return (
    <div className="CartItemCart">
      <img src={item.image} alt="productImage" />

      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: NRS. ${item.price}`}</span>
        <p onClick={() => removeItem(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
