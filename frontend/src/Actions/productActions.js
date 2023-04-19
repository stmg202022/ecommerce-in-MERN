import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERROR,
} from "../Constants/productConstant";

export const getAllProduct = async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });

    const { data } = await axios.get("http://localhost:8080/api/v1/product");

    dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_PRODUCT_FAIL, payload: error.responce.data.message });
  }
};

//CLEARING ERROR
export const clearError = async (dispatch) => {
  dispatch({ tyye: CLEAR_ERROR });
};
