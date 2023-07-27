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

export const newOderReducer = (state = {}, action) => {
  switch (action.type) {
    //
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case CREATE_ORDER_FAIL:
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

export const myOderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    //
    case MY_ORDER_REQUEST:
      return {
        loading: true,
      };

    case MY_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case MY_ORDER_FAIL:
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

export const oderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    //
    case ORDER_DETALIS_REQUEST:
      return {
        loading: true,
      };

    case ORDER_DETALIS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_DETALIS_FAIL:
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
