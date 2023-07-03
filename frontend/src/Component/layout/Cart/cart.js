import React, { Fragment } from "react";
import "./cart.css";
import CartItemsCart from "./cartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart } from "../../../Redux/Actions/cartActions";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  //   const item = {
  //     product: "productID",
  //     price: 200,
  //     name: "telephone",
  //     quantity: 1,
  //     image:
  //       "https://cdn.vox-cdn.com/thumbor/08jubjGM7E7FStVppBEAc0u489E=/0x0:2040x1360/1400x1400/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/13272937/jbareham_181012_2989_0549.jpg",
  //   };

  const increaseItem = (id, quantity, stock) => {
    const newQuantity = quantity + 1;

    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQuantity));
  };

  const decreaseItem = (id, quantity) => {
    const newQuantity = quantity - 1;

    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQuantity));
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>NO RPODUCT IN YOUR CART</Typography>
          <Link to="/products">VIEW PRODUCT</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {cartItems &&
              cartItems.map((item) => {
                return (
                  <div className="cartContainer" key={item.product}>
                    <CartItemsCart item={item} />
                    <div className="cartInput">
                      <button
                        onClick={() =>
                          decreaseItem(item.product, item.quantity)
                        }
                      >
                        -
                      </button>
                      <input type="number" value={item.quantity} readOnly />
                      <button
                        onClick={() =>
                          increaseItem(item.product, item.quantity, item.stock)
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="subTotal">NRS.{item.price * item.quantity}</p>
                  </div>
                );
              })}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`${cartItems.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
