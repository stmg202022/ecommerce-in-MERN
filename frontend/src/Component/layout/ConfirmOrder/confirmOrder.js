import React, { Fragment } from "react";
import "./confirmOrder.css";
import CheckOutSteps from "../Shipping/checkOutSteps";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingCharge = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + shippingCharge + tax;

  const address = `${shippingInfo.address}, ${shippingInfo.state}, ${shippingInfo.city}`;

  // console.log(cartItems);

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharge,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/payment/process");
  };

  return (
    <Fragment>
      <div className="mainShipping">
        <CheckOutSteps activeStep={1} />
        <div className="confirmOrderPage">
          <div>
            <div className="confirmShippingArea">
              <Typography>Shipping Info</Typography>
              <div className="confirmShippingAreaBox">
                <div>
                  <p>Name:</p>
                  <span>{user.name}</span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>{address}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>{shippingInfo.phoneNo}</span>
                </div>
              </div>
            </div>
            <div className="confirmCartItems">
              <Typography>Your Cart Items:</Typography>
              <div className="confirmCartItemsContainer">
                {cartItems &&
                  cartItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      <span>
                        {item.quantity} * {item.price} =
                        <b> NRs.{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div>
            <div className="orderSummary">
              <Typography>Order Summery</Typography>
              <div>
                <div>
                  <p>SubTotal: </p>
                  <span>NRs. {subtotal}</span>
                </div>
                <div>
                  <p>Shipping Charge: </p>
                  <span>NRs. {shippingCharge}</span>
                </div>
                <div>
                  <p>GST: </p>
                  <span>NRs. {tax}</span>
                </div>
              </div>

              <div className="orderSummaryTotal">
                <div>
                  <b>Total:</b>
                  <span>NRs. {totalPrice}</span>
                </div>
              </div>
              <button onClick={proceedToPayment}>Proceed To Payment</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
