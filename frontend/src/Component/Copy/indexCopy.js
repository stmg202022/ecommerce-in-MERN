// import React from "react";
// import { createRoot } from "react-dom/client";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Navigate,
// } from "react-router-dom";

// import { Provider } from "react-redux";
// import store from "./stores";

// import AppLayout from "./App";

// import Home from "./Component/layout/Home/home";

// // import Products from "./Component/layout/Product/products";
// // import ProductHome from "./Component/layout/Product2/productHome";
// import ProductSearch from "./Component/layout/Products/ProductSearch/product_search";
// // import { positions, transition, Provider as AlertProvider } from "react-alert";

// import Search from "./Component/layout/Search/search";

// import LoginSignUp from "./Component/user/userLoginSignUp/userLoginSignUp";
// import About from "./Component/layout/About/about";
// import Contact from "./Component/layout/Contact/contact";

// import Products from "./Component/layout/Products/product_home";
// import ProductDetails from "./Component/layout/Products/ProductDetail/product_details";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import Account from "./Component/layout/UserAccout/account";

// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },

//       {
//         path: "/products",
//         element: <Products />,
//       },

//       {
//         path: "/products/:keyword",
//         element: <ProductSearch />,
//       },

//       {
//         path: "/contact",
//         element: <Contact />,
//       },
//       {
//         path: "/about",
//         element: <About />,
//       },
//       {
//         path: "/login",
//         element: <LoginSignUp />,
//       },
//       {
//         path: "/product/:id",
//         element: <ProductDetails />,
//       },

//       {
//         element: <Search />,
//         path: "/products/search",
//       },
//       {
//         path: "/account",
//         // element: <Account />,
//         element: isAuthenticated() ? <Account /> : <Navigate to="/" />,
//       },
//     ],
//   },

//   // {
//   //   path: "/account",
//   //   element: isAuthenticated() ? <Account /> : <Navigate to="/" />,
//   // },
// ]);

// function isAuthenticated() {
//   // Add your logic to check if the user is authenticated
//   // Return true if authenticated, false otherwise
//   return document.cookie ? true : false;
// }

// createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <ToastContainer />
//     <RouterProvider router={router} />
//   </Provider>
// );
