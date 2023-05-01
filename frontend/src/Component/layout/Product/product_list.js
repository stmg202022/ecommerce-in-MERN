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

const valuetext = (value) => {
  return `NRS ${value}`;
};

const ProductList = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 100]);

  const { loading, error, products, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  console.log(keyword);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(getProducts(keyword, currentPage));
  }, [dispatch, error, keyword, currentPage]);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  //Slider
  const getPriceRangeLabel = (value) => {
    return `$${value}`;
  };

  console.log(valuetext());

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

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
            <Typography>Price</Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceRangeChange}
              min={0}
              max={2500}
              valueLabelDisplay="auto"
              getAriaValueText={getPriceRangeLabel}
            />
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
          </div>
        </div>
      )}

      <div className="pagination">
        {resultPerPage < productsCount && (
          <Pagination
            activePage={currentPage} //1
            totalItemsCount={productsCount} //number of product 20
            itemsCountPerPage={resultPerPage} // 8 so, 20 /8 === 2 page and 4 product {1 } {2}
            // // totalItemsCount={items.length}
            // // pageRangeDisplayed={5}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;
