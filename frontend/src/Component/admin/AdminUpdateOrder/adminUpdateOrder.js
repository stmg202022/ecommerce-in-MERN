import React, { Fragment, useEffect, useState } from "react";
import "./adminUpdateOrder.css";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Sidebar/sidebar";

import Loader from "../../layout/Loader/loader";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Typography } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Button } from "@mui/material";

import {
  getOrderDetails,
  adminUpdateOrders,
  clearError,
} from "../../../Redux/Actions/orderActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UPDATE_ORDER_RESET } from "../../../Redux/Constants/orderConstant";

const AdminUpdateOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [status, setStatus] = useState("");

  const { loading, order, error } = useSelector((state) => state.orderDetails);
  const { error: updatedError, isUpdated } = useSelector(
    (status) => status.updateOrders
  );

  console.log("***************************************************", order);

  const name = order?.user?.name;
  const address = `${order?.shippingInfo?.address}, ${order?.shippingInfo?.city} `;
  const phoneNo = `${order?.shippingInfo?.phoneNo} / ${order?.paymentInfo?.sendPhoneNo} `;

  //   const { loading, error, isUpdated } = useSelector(
  //     (state) => state.updateOrders
  //   );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (updatedError) {
      toast.error(updatedError);
      dispatch(clearError());
    }

    if (isUpdated) {
      toast("Order Updated SuccessFully");
      dispatch({ type: UPDATE_ORDER_RESET });
      navigate(`admin/order/update/${id}`);
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updatedError, navigate]);

  const updateOrderSubmitHandler = (e) => {
    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(adminUpdateOrders(id, myForm));
  };

  return (
    <Fragment>
      <div className="dashboard">
        <Sidebar />
        <div>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <div className="ordersDetails">
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
                      <span>
                        Rs. {order?.totalPrice && order.totalPrice} /-
                      </span>
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
                        {order.orderStatus}
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
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
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
                <div className="updateOrder">
                  <form
                    action=""
                    className="adminUpdateProductForm"
                    encType="multipart/form-data"
                    onSubmit={updateOrderSubmitHandler}
                  >
                    <h1>Process Orders</h1>

                    <div>
                      <AccountTreeIcon />
                      <select
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                      >
                        <option value="">Select Order Status</option>
                        {order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}
                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>

                    <Button
                      id="updateProductBtn"
                      type="submit"
                      disabled={
                        loading ? true : false || status === "" ? true : false
                      }
                    >
                      PROCESS
                    </Button>
                  </form>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default AdminUpdateOrder;
