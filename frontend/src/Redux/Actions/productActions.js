import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  //
  // FOR ADMIN ONLY
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,

  //ADMIN CREATE PRODUCT (post)
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,

  //ADMIN DELETE PRODUCT (delete)
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,

  //ADMIN PRODUCT UPDATE (put)
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  //
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  //
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  // NEW_REVIEW_RESET,
  NEW_REVIEW_FAIL,
  //

  //GET ALL REVIEWS BY ADMIN
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,

  //DELETE PRODUCT REVIEW BY USING PRODUCT_ID AND REVIEW_ID (ADMIN)
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,

  //
  CLEAR_ERROR,
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

//ADMIN GET ALL PRODUCTS
export const adminGetAllProducts = () => async (dispatch) => {
  try {
    await dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get(
      `http://localhost:8080/api/v1/admin/products`
    );

    await dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data });

    console.log("adminProducts are===============", data);
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
    // console.log(error.response.data.message);
  }
};

//ADMIN CREATE PRODUCT
export const adminCreateProduct = (formData) => async (dispatch) => {
  try {
    await dispatch({ type: CREATE_PRODUCT_REQUEST });

    const cookies = document.cookie.split(";");

    let token = "";
    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");

      if (name === "token") {
        token = value;
      }
    });

    const { data } = await axios.post(
      `http://localhost:8080/api/v1/product/new`,
      formData,
      {
        headers: {
          authorization: token,
        },
      }
    );

    console.log(data);

    await dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//ADMIN DELETE PRODUCT
export const adminDeleteProduct = (id) => async (dispatch) => {
  try {
    await dispatch({ type: DELETE_PRODUCT_REQUEST });

    const cookies = document.cookie.split(";");

    let token = "";

    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");

      if (name === "token") {
        token = value;
      }
    });

    const { data } = await axios.delete(
      `http://localhost:8080/api/v1/product/${id}`,
      {
        headers: {
          authorization: token,
        },
      }
    );

    console.log("data after deleting product", data);

    await dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//ADMIN UPDATE PRODUCT
export const adminUpdateProduct = (id, productData) => async (dispatch) => {
  try {
    await dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const cookies = document.cookie.split(";");

    let token = "";

    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");

      if (name === "token") {
        token = value;
      }
    });

    const { data } = await axios.put(
      `http://localhost:8080/api/v1/product/${id}`,
      productData,
      {
        headers: {
          authorization: token,
        },
      }
    );

    await dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
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

//CREATE NEW REVIW FOR PRODUCT
export const newReview = (myReviewFormData) => async (dispatch) => {
  // console.log(myReviewFormData);

  try {
    await dispatch({ type: NEW_REVIEW_REQUEST });

    const cookies = document.cookie.split(";");

    let token = "";
    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");

      if (name === "token") {
        token = value;
      }
    });

    const { data } = await axios.put(
      `http://localhost:8080/api/v1/review`,
      myReviewFormData,
      {
        headers: {
          authorization: token,
        },
      }
    );

    console.log(data);

    await dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });

    // console.log(data.product);
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
    // console.log(error.response.data.message);
  }
};

//GET ALL REVIWS OF PRODUCT BY ID (ADMIN)
export const getAllReviews = (id) => async (dispatch) => {
  try {
    await dispatch({ type: ALL_REVIEW_REQUEST });

    const cookies = document.cookie.split(";");

    let token = "";
    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");

      if (name === "token") {
        token = value;
      }
    });

    const { data } = await axios.get(
      `http://localhost:8080/api/v1/reviews?productId=${id}`,
      {
        headers: {
          authorization: token,
        },
      }
    );

    console.log("Reviews list are:", data.reviews);

    await dispatch({ type: ALL_REVIEW_SUCCESS, payload: data.reviews });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//DELETE REVIW OF PRODUCT BY PRODUCT_ID  AND REVIEW_ID (ADMIN)
export const deleteProductReviews =
  (reviewId, productId) => async (dispatch) => {
    try {
      await dispatch({ type: DELETE_REVIEW_REQUEST });

      const cookies = document.cookie.split(";");

      let token = "";
      cookies.forEach((cookie) => {
        const [name, value] = cookie.trim().split("=");

        if (name === "token") {
          token = value;
        }
      });

      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/reviews?id=${reviewId}&productId=${productId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      console.log("Reviews list are:", data);

      await dispatch({ type: DELETE_REVIEW_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: DELETE_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//CLEARING ERROR
export const clearError = () => async (dispatch) => {
  await dispatch({ type: CLEAR_ERROR });
};
