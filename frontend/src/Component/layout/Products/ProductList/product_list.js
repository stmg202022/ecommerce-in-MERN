import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  clearError,
} from "../../../../Redux/Actions/productActions";
import "./product_list.css";

import Loader from "../../Loader/loader";

//
import ProductCart from "../ProductCart/productCart";

import Pagination from "react-js-pagination";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useParams } from "react-router-dom";

import { Typography } from "@mui/material";
import Slider from "@mui/material/Slider";

//for categiries list_map
const categories = [
  "Smartphones",
  "Bike",
  "Laptop",
  "Camera",
  "Shoes",
  "T-Shirt",
];

const ProductList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  let { keyword } = useParams();
  // console.log(keyword);

  const [price, setPrice] = useState([0, 300000]);
  // console.log(price);

  const [ratings, setRatings] = useState(0);
  // console.log(ratings);

  const [category, setCategory] = useState("");
  // console.log(category);

  //getting data from reducer state....
  const {
    loading,
    error,
    products,
    productsCount,
    resultPerPage,
    // filteredProductsCount,
  } = useSelector((state) => state.products);

  const count = products.length;

  // console.log(count);
  // console.log(products);
  // console.log(resultPerPage);
  // console.log(productsCount);
  // console.log(resultPerPage < productsCount);

  //fetching data...
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(getProducts(currentPage, keyword, price, ratings, category));
  }, [dispatch, error, currentPage, keyword, price, ratings, category]);

  //
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
    // console.log(e);
  };

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
    //
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {loading ? (
        <Loader />
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {/* if keyword exist */}

          {keyword && (
            <div className="filterBox">
              <div style={{ width: "300px" }}>
                <Typography>Price</Typography>
                <Slider
                  value={price}
                  onChange={handlePriceChange}
                  min={0}
                  max={300000}
                  valueLabelDisplay="auto"
                  size="small"
                  getAriaLabel={(index) =>
                    `${index === 0 ? "Minimum" : "Maximum"} price`
                  }
                  // getAriaValueText={getPriceRangeLabel}
                />
              </div>

              <div>
                <Typography>Category</Typography>
                <ul className="categoryBox">
                  {categories.map((category) => (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rating">
                <Typography>Rating Above:</Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newValue) => {
                    setRatings(newValue);
                  }}
                  size="small"
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </div>
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {/* <ProductCart rounded={true} clickable={true} product={products} /> */}
            {products &&
              products.map((product) => (
                <ProductCart
                  rounded={true}
                  product={product}
                  key={product._id}
                />
              ))}
            {products.length === 0 && (
              <div style={{ margin: "20px 0px" }}>
                <h2>PRODUCT NOT FOUND!</h2>
              </div>
            )}
          </div>
          <div>
            {!keyword ? (
              <div className="pagination">
                <Pagination
                  activePage={currentPage}
                  onChange={setCurrentPageNo}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            ) : (
              <div>
                {resultPerPage <= count ? (
                  <div className="pagination">
                    <Pagination
                      activePage={currentPage}
                      onChange={setCurrentPageNo}
                      itemsCountPerPage={resultPerPage}
                      totalItemsCount={productsCount}
                      nextPageText="Next"
                      prevPageText="Prev"
                      firstPageText="1st"
                      lastPageText="Last"
                      itemClass="page-item"
                      linkClass="page-link"
                      activeClass="pageItemActive"
                      activeLinkClass="pageLinkActive"
                    />
                  </div>
                ) : (
                  count > 0 && <div>No More Found Then This Much...</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
