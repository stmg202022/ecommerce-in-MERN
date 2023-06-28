import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./stores"; // Assuming you have your Redux store configured in a separate file

import App from "./App";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>
);
