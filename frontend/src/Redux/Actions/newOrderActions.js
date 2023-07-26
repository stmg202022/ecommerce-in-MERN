import axios from "axios";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CLEAR_ERROR,
} from "../Constants/orderConstant";

export const createOrder = (order) => async (dispatch) => {
  //
  console.log("the order is: ", order);

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

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
