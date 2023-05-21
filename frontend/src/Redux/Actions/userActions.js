import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  CLEAR_ERRORS,
} from "../Constants/userConstant";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    console.log(email);
    console.log(password);

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "http://localhost:8080/api/v1/login",
      {
        email,
        password,
      },
      config
    );

    console.log(data);

    await dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    // const userData = {
    //   name: "samson",
    //   email: "samson@gmail.com",
    //   password: "samsonsamson",
    //   avatar: "image1.png",
    // };

    console.log(userData);

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      "http://localhost:8080/api/v1/register",
      userData,
      config
    );

    // console.log(data);

    await dispatch({ type: USER_REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearUserErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
