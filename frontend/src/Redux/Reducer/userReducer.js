import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  CLEAR_ERRORS,
} from "../Constants/userConstant";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
      // console.log(action.payload);
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
