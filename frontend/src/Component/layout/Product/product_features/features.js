import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../../../Redux/Actions/productActions";
import { clearError } from "../../../../Redux/Actions/productActions";
import ProductCart from "../CartProduct/productCart";
import Pagination from "react-js-pagination";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Loader/loader";

const Features = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    loading,
    error,
    products,
    productsCount,
    resultPerPage,
    // filteredProductsCount,
  } = useSelector((state) => state.products);

  // console.log("productsCounts" + " " + productsCount);
  // console.log("resultPrePage: " + resultPerPage);
  // console.log("currentpage: " + currentPage);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(getProducts());
  }, [dispatch, error]);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
    console.log(e);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
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
              <ProductCart rounded={true} product={product} key={product._id} />
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
      )}
    </div>
  );
};

export default Features;
