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

  //AMDIN GET ALL ORDERS
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  ALL_ORDER_FAIL,
  //AMDIN UPDATE  ORDERS
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  //AMDIN DELETE ORDERS
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,

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

//ADMIN GET ALL ORDERS
export const adminGetAllOrders = () => async (dispatch) => {
  try {
    await dispatch({ type: ALL_ORDER_REQUEST });

    const cookies = document.cookie.split(";");

    let token = "";
    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");

      if (name === "token") {
        token = value;
      }
    });

    const { data } = await axios.get(
      "http://localhost:8080/api/v1/admin/orders",
      {
        headers: {
          authorization: token,
        },
      }
    );

    await dispatch({ type: ALL_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//ADMIN UPDATE ALL ORDERS
export const adminUpdateOrders = (id, orderData) => async (dispatch) => {
  try {
    await dispatch({ type: UPDATE_ORDER_REQUEST });

    const cookies = document.cookie.split(";");

    let token = "";
    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");

      if (name === "token") {
        token = value;
      }
    });

    const { data } = await axios.put(
      `http://localhost:8080/api/v1/admin/update/order/${id}`,
      orderData,
      {
        headers: {
          authorization: token,
        },
      }
    );

    await dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//ADMIN UPDATE ALL ORDERS
export const adminDeleteOrders = (id) => async (dispatch) => {
  try {
    await dispatch({ type: DELETE_ORDER_REQUEST });

    const cookies = document.cookie.split(";");

    let token = "";
    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");

      if (name === "token") {
        token = value;
      }
    });

    const { data } = await axios.delete(
      `http://localhost:8080/api/v1/admin/order/${id}`,
      {
        headers: {
          authorization: token,
        },
      }
    );

    await dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
