import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  //
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  //

  //
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  //
  CLEAR_ERRORS,
} from "../Constants/userConstant";

//LOGIN
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "http://localhost:8080/api/v1/login",
      {
        email,
        password,
      },
      config
    );
    // debugger;
    const { token } = data;
    console.log("Received token:", token);

    //set the expired/max-age of the token
    //token should be set because the backend do not support to set the token in application => cookies itself
    document.cookie = `token=${token}; path=/`;
    // debugger;

    // console.log("Token set as a cookie:", document.cookie);

    await dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data.message });
  }
};

//REGISTER
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

    console.log(data);

    // const { token } = data;
    // console.log("Received token:", token);

    // document.cookie = `token=${token}; path=/`;

    // console.log("Token set as a cookie:", document.cookie);

    await dispatch({ type: USER_REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//LOAD
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const cookie = document.cookie;
    // console.log("the token is" + cookie);

    const token = cookie.split("=")[1];

    console.log({ token });
    const res = await axios.get("http://localhost:8080/api/v1/me", {
      headers: {
        authorization: token,
      },
    });

    console.log(res.data.user);

    // console.log(document.cookie);

    await dispatch({ type: LOAD_USER_SUCCESS, payload: res.data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

//LOGOUT
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    // const cookie = document.cookie;
    // console.log("the token is" + cookie);

    // const token = cookie.split("=")[1];

    // console.log({ token });

    const res = await axios.post("http://localhost:8080/api/v1/logout");

    console.log(res.data.message);

    // Create a Date object with the current date and time
    const currentDate = new Date();

    // Set the cookie expiration date to the current date and time
    currentDate.setMinutes(currentDate.getMinutes() - 1); // Subtract 1 minute from the current time (optional adjustment)

    // Convert the expiration date to UTC format
    const expirationDate = currentDate.toUTCString();

    // Remove the token from the cookie by setting an expired date
    document.cookie = `token=; expires=${expirationDate}; path=/;`;

    await dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

//USER EDIT PROFILE
export const userChangeProfile = (updateData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const cookie = document.cookie;
    // console.log("the token is" + cookie);

    const token = cookie.split("=")[1];

    console.log({ token });

    console.log(
      "update Data are]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]",
      updateData.get("name") + updateData.get("email")
    );

    const res = await axios.put(
      "http://localhost:8080/api/v1/me/update",
      updateData, // Pass updateData as the request body
      {
        headers: {
          authorization: token,
        },
      }
    );

    console.log(
      "??????????????????????????????????????????????????????????????????",
      res
    );

    await dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: res.data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//USER EDIT PASSWORD
export const userChangePassword = (updateData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const cookie = document.cookie;
    // console.log("the token is" + cookie);

    const token = cookie.split("=")[1];

    console.log({ token });

    // console.log(
    //   "update password Data are]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]",
    //   updateData.get("oldPassword") +
    //     updateData.get("newPassword") +
    //     updateData.get("confirmPassword")
    // );

    const res = await axios.put(
      "http://localhost:8080/api/v1/password/update",
      updateData, // Pass updateData as the request body
      {
        headers: {
          authorization: token,
        },
      }
    );

    // console.log(
    //   "??????????????????????????????????????????????????????????????????",
    //   res
    // );

    await dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: res.data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//CLEAR-USER-ERRORS
export const clearUserErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
