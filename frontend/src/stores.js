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
  deleteProductReducer,
  adminUpdateProductReducer,
  productReviewsReducer,
  deleteReviewsReducer,
} from "./Redux/Reducer/productReducer";

import {
  userReducer,
  profileReducer,
  forgotPasswordReducer,
  getSingleUserReducer,
  getAllUsersReducer,
  deleteUsersReducer,
  updateUsersReducer,
} from "./Redux/Reducer/userReducer";

import {
  newOderReducer,
  myOderReducer,
  oderDetailsReducer,
  adminGetAllOrdersReducer,
  adminUpdateOrdersReducer,
  adminDeleteOrdersReducer,
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
  deleteProduct: deleteProductReducer,
  updateProduct: adminUpdateProductReducer,
  allOrders: adminGetAllOrdersReducer,
  updateOrders: adminUpdateOrdersReducer,
  deleteOrders: adminDeleteOrdersReducer,
  //ADMIN DASHBOARD
  singleUser: getSingleUserReducer,
  allUsers: getAllUsersReducer,
  deleteUser: deleteUsersReducer,
  updateUser: updateUsersReducer,
  productReviews: productReviewsReducer,
  deleteReview: deleteReviewsReducer,
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
