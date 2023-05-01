import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERROR,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
} from "../Constants/productConstant";

//get all product reducer
export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    //
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resultPerPage: action.payload.resultPerPage,
      };

    case ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//get product detail reducer

export const productDetailReducer = (
  state = { product_details: [] },
  action
) => {
  // console.log(action.payload);

  switch (action.type) {
    //
    case PRODUCT_DETAIL_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case PRODUCT_DETAIL_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };

    case PRODUCT_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
