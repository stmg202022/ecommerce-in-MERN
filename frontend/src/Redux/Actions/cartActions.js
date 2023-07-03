import { ADD_TO_CART, REMOVE_CART_ITEM } from "../Constants/cartConstant";
import axios from "axios";

//ADD ITEM TO THE CART
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  //
  const { data } = await axios.get(
    `http://localhost:8080/api/v1/product/${id}`
  );

  console.log(data);

  dispatch({
    type: ADD_TO_CART, //FIRST  add this item goes to state.cart.cartItems
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });

  //SECONDLY item is again called by using getState() and store it in localStorage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems)); //getState() is from redux

  //
  // addto cart btn click => data => store => localStorage => store || [] (reLoading...)
  //
};

//REMOVE FROM CART ITEM
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  //

  dispatch({
    type: REMOVE_CART_ITEM, //FIRST  add this item goes to state.cart.cartItems
    payload: id,
  });

  //SECONDLY item is again called by using getState() and store it in localStorage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems)); //getState() is from redux

  //
  // addto cart btn click => data => store => localStorage => store || [] (reLoading...)
  //
};
