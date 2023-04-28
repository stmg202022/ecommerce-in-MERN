import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERROR,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
} from "../Constants/productConstant";

import axios from "axios";

//GETING ALL PRODUCT
export const getProducts = () => async (dispatch) => {
  try {
    await dispatch({ type: ALL_PRODUCT_REQUEST });

    const { data } = await axios.get("http://localhost:8080/api/v1/product");

    await dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });

    // console.log(data);
  } catch (err) {
    dispatch({ type: ALL_PRODUCT_FAIL, payload: err.response.data.message });
  }
};

//GETING A PRODUCT DETAIL
export const getProductDetails =
  ({ id }) =>
  async (dispatch) => {
    try {
      await dispatch({ type: PRODUCT_DETAIL_REQUEST });

      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/${id}`
      );

      await dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data.product });

      // console.log(data.product);
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAIL_FAIL,
        payload: error.response.data.message,
      });
      // console.log(error.response.data.message);
    }
  };

//CLEARING ERROR
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
