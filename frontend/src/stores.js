import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productReducer,
  productDetailReducer,
  newReviewReducer,
  getAdminpProductReducer,
  createProductReducer,
  deleteProductRequest,
} from "./Redux/Reducer/productReducer";

import {
  userReducer,
  profileReducer,
  forgotPasswordReducer,
} from "./Redux/Reducer/userReducer";

import {
  newOderReducer,
  myOderReducer,
  oderDetailsReducer,
} from "./Redux/Reducer/orderReducer";

import { cartReducer } from "./Redux/Reducer/cartReducer";

//root_reducer
const rootReducer = combineReducers({
  products: productReducer,
  productDetails: productDetailReducer,
  users: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOderReducer,
  myOrders: myOderReducer,
  orderDetails: oderDetailsReducer,
  newReview: newReviewReducer,
  adminProducts: getAdminpProductReducer,
  createProduct: createProductReducer,
  deleteProduct: deleteProductRequest,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
