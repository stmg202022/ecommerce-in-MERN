import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./stores";

import AppLayout from "./App";

import Home from "./Component/layout/Home/home";

// import Products from "./Component/layout/Product/products";
// import ProductHome from "./Component/layout/Product2/productHome";
import ProductSearch from "./Component/layout/Products/ProductSearch/product_search";
// import { positions, transition, Provider as AlertProvider } from "react-alert";

import Search from "./Component/layout/Search/search";

import Login from "./Component/layout/Login/login";
import About from "./Component/layout/About/about";
import Contact from "./Component/layout/Contact/contact";

import Products from "./Component/layout/Products/product_home";
import ProductDetails from "./Component/layout/Products/ProductDetail/product_details";

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
        path: "/products/:keyword",
        element: <ProductSearch />,
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
        path: "/product/:id",
        element: <ProductDetails />,
      },

      {
        element: <Search />,
        path: "/products/search",
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
