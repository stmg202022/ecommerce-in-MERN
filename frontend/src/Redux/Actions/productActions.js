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

export const getProducts =
  (currentPage, keyword = "", price = [0, 300000], ratings, category) =>
  async (dispatch) => {
    try {
      await dispatch({ type: ALL_PRODUCT_REQUEST });

      // console.log(currentPage);
      // console.log(keyword);
      // console.log(price);
      // console.log(ratings);
      // console.log(category);

      let link = `http://localhost:8080/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `http://localhost:8080/api/v1/products?category=${category}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);

      // console.log(link);

      await dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });

      // console.log(data);
    } catch (err) {
      dispatch({ type: ALL_PRODUCT_FAIL, payload: err.response.data.message });
    }
  };

//GETING A PRODUCT DETAIL //single product
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

// // //GETING ALL PRODUCT
// // export const getProducts =
// //   (keyword = "", currentPage, price = [0, 300000], category, ratings) =>
// //   async (dispatch) => {
// //     try {
// //       await dispatch({ type: ALL_PRODUCT_REQUEST });

// //       let link = `http://localhost:8080/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

// //       // if (keyword) {
// //       //   link = `http://localhost:8080/api/v1/products?keyword=${keyword}&page=${currentPage}`;
// //       // } else if (price && category && ratings) {
// //       //   link = `http://localhost:8080/api/v1/products?&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
// //       // }

// //       if (category) {
// //         link = `http://localhost:8080/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
// //       }

// //       const { data } = await axios.get(link);

// //       // console.log(link);

// //       await dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });

// //       // console.log(data);
// //     } catch (err) {
// //       dispatch({ type: ALL_PRODUCT_FAIL, payload: err.response.data.message });
// //     }
// //   };

//CLEARING ERROR
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
