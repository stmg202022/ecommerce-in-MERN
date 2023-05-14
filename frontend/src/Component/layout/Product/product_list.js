import React, { useEffect, useState } from "react";
import ProductCart from "./CartProduct/productCart";
import Loader from "../Loader/loader";
import { useSelector } from "react-redux";
import { getProducts } from "../../../Redux/Actions/productActions";
import { useDispatch } from "react-redux";
// import AlertDialog from "../Alert/alert";
import { clearError } from "../../../Redux/Actions/productActions";

import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./product_list.css";

const categories = ["Smartphones", "Bike", "Laptop", "Camera"];

const ProductList = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  let { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 300000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    loading,
    error,
    products,
    productsCount,
    resultPerPage,
    // filteredProductsCount,
  } = useSelector((state) => state.products);

  // console.log(filteredProductsCount);
  // console.log(resultPerPage);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(getProducts(keyword, price, category, ratings)); //currentPage
  }, [dispatch, error, keyword, price, category, ratings]); //currentPage

  // let count = filteredProductsCount;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
    // console.log(e);
  };

  //Slider

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
    //
  };

  // const getPriceRangeLabel = (value) => {
  //   return `$${value}`;
  // };

  // console.log(getPriceRangeLabel());

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {loading ? (
        <Loader />
      ) : (
        // : error ? (
        //   <AlertDialog error={error} />
        // )
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
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
                  console.log(newValue);
                }}
                size="small"
                aria-label="Small"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </div>
          </div>

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

            {resultPerPage < productsCount && (
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
            )}

            {products.length === 0 && (
              <div style={{ margin: "20px 0px" }}>
                <h2>PRODUCT NOT FOUND!</h2>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
