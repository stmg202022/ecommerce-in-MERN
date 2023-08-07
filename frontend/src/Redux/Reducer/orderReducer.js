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

  //ADMIN GETTING USERS ALL ORDERS
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  ALL_ORDER_FAIL,
  //ADMIN GETTING USERS ALL ORDERS
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_RESET,

  //ADMIN GETTING USERS ALL ORDERS
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_RESET,

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

//ADMIN GET ALL ORDERS OF ALL USERS
export const adminGetAllOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };

    case ALL_ORDER_FAIL:
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

//ADMIN UPDATE USERS ALL ORDERS
export const adminUpdateOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ORDER_REQUEST:
    case UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_ORDER_FAIL:
    case UPDATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_ORDER_RESET:
      return {
        ...state,
        isDeleted: false,
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

//ADMIN DELETE ORDERS
export const adminDeleteOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_ORDER_RESET:
      return {
        ...state,
        isDeleted: false,
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
