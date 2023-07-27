import axios from "axios";
import {
  //IT IS FOR CREATING ORDERS
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,

  //FOR GETTING USER ALL ORDERS
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,

  //IT IS FOR GETTTING A DETEAILS OF SINGLE ORDERS BY ITS ID
  ORDER_DETALIS_REQUEST,
  ORDER_DETALIS_SUCCESS,
  ORDER_DETALIS_FAIL,
  //
  CLEAR_ERROR,
} from "../Constants/orderConstant";

//IT IS FOR CREATING ORDERS
export const createOrder = (order) => async (dispatch) => {
  //
  // console.log("the order is: ", order);

  try {
    await dispatch({ type: CREATE_ORDER_REQUEST });

    const cookies = document.cookie.split(";");

    let token = "";
    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");

      if (name === "token") {
        token = value;
      }
    });

    // console.log(token);

    const { data } = await axios.post(
      "http://localhost:8080/api/v1/order/new",
      order,
      {
        headers: {
          authorization: token,
        },
      }
    );

    await dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.message,
    });
  }
};

//GETTING USER ALL ORDERS
export const myOrders = () => async (dispatch) => {
  //

  try {
    await dispatch({ type: MY_ORDER_REQUEST });

    const cookies = document.cookie.split(";");

    let token = "";
    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");

      if (name === "token") {
        token = value;
      }
    });

    // console.log(token);

    const { data } = await axios.get("http://localhost:8080/api/v1/orders/me", {
      headers: {
        authorization: token,
      },
    });

    await dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDER_FAIL,
      payload: error.response.message,
    });
  }
};

//IT IS FOR GETTING A SINGLE ORDER BY ITS ID
export const getOrderDetails = (id) => async (dispatch) => {
  //
  // console.log("the order is: ", order);

  try {
    await dispatch({ type: ORDER_DETALIS_REQUEST });

    const cookies = document.cookie.split(";");

    let token = "";
    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");

      if (name === "token") {
        token = value;
      }
    });

    // console.log(token);

    const { data } = await axios.get(
      `http://localhost:8080/api/v1/order/${id}`,
      {
        headers: {
          authorization: token,
        },
      }
    );

    await dispatch({ type: ORDER_DETALIS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETALIS_FAIL,
      payload: error.response.message,
    });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
