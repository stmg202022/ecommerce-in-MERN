import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./stores";

import AppLayout from "./App";

import Home from "./Component/layout/Home/home";
import Products from "./Component/layout/Product/products";
import Login from "./Component/layout/Login/login";
import About from "./Component/layout/About/about";
import Contact from "./Component/layout/Contact/contact";
import ProductDetails from "./Component/layout/Product/ProductDetail/product_details";

// import { positions, transition, Provider as AlertProvider } from "react-alert";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer />
    <RouterProvider router={router} />
  </Provider>
);
