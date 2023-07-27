import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";

import { useSelector, useDispatch } from "react-redux";
import {
  getOrderDetails,
  clearError,
} from "../../../Redux/Actions/orderActions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loader from "../Loader/loader";

import { Typography } from "@mui/material";

import { Link, useParams } from "react-router-dom";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, order, error } = useSelector((state) => state.orderDetails);

  console.log("***************************************************", order);

  const name = order?.user?.name;
  const address = `${order?.shippingInfo?.address}, ${order?.shippingInfo?.city} `;
  const phoneNo = `${order?.shippingInfo?.phoneNo} / ${order?.paymentInfo?.sendPhoneNo} `;

  //   console.log();
  //   console.log();
  //   console.log();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{name}</span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>{address}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>{phoneNo}</span>
                </div>
              </div>

              <Typography>Payment</Typography>
              <div>
                <p
                  className={
                    order?.paymentInfo &&
                    order.paymentInfo.status === "Completed"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order?.paymentInfo &&
                  order.paymentInfo.status === "Completed"
                    ? "PAID"
                    : "NOT PAID"}
                </p>
              </div>

              <div>
                <p>Amount: </p>
                <span>Rs. {order?.totalPrice && order.totalPrice} /-</span>
              </div>
            </div>

            <Typography>Order Status</Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p
                  className={
                    order?.orderStatus === "Delivered"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order?.orderStatus === "Delivered"
                    ? "Delivered"
                    : "Processing"}
                </p>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order?.orderItems &&
                  order.orderItems.map((item) => {
                    return (
                      <div key={item.product}>
                        <img src={item.image} alt="Product" />
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                        <br />
                        <span>
                          {item.quantity} X {item.price} =
                          <b>Rs. {item.price * item.quantity}</b>
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
