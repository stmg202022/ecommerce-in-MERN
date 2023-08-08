import React, { Fragment, useEffect, useState } from "react";
import "./productReviews.css";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";

import SideBar from "../Sidebar/sidebar";
import Loader from "../../layout/Loader/loader";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { DELETE_REVIEW_RESET } from "../../../Redux/Constants/productConstant";

import {
  getAllReviews,
  deleteProductReviews,
  clearError,
} from "../../../Redux/Actions/productActions";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { reviews, error, loading } = useSelector(
    (state) => state.productReviews
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteReview
  );

  const [productId, setProductId] = useState("");

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    } else if (error) {
      toast.error(error);
      setProductId("");
      dispatch(clearError());
      // return;
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearError());
      return;
    } else if (isDeleted) {
      toast("Review Deleted SuccessFully.");
      dispatch({ type: DELETE_REVIEW_RESET });
      navigate("/admin/reviews");
    }
  }, [dispatch, error, productId, deleteError, isDeleted, navigate]);

  const deleteReviewHandler = (reviewId) => {
    console.log(reviewId, productId);
    dispatch(deleteProductReviews(reviewId, productId));
  };

  const columns = [
    {
      field: "id",
      headerName: "REVIEW ID",
      minWidth: 300,
      flex: 0.7,
    },
    {
      field: "user",
      headerName: "USER NAME",
      minWidth: 300,
      flex: 0.5,
    },
    {
      field: "comment",
      headerName: "REVIEW COMMENT",
      minWidth: 150,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "RATING",
      type: "number",
      minWidth: 150,
      flex: 0.6,
      cellClassName: (params) => {
        return params.row.rating >= 3 ? "greenColor" : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "ACTIONS",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button>
              <DeleteIcon
                onClick={() => deleteReviewHandler(params.row.id, productId)}
              />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((rev, index) => {
      rows.push({
        id: rev._id,
        user: rev.name,
        comment: rev.comment,
        rating: rev.rating,
      });
    });

  const productReviewsIdSubmitHandler = (e) => {
    e.preventDefault();

    console.log("productId for showing reviews list is: ", productId);

    dispatch(getAllReviews(productId));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="dashboard">
            <SideBar />
            <div className="productReviewsContainer">
              <form
                action=""
                className="productReviewsForm"
                encType="multipart/form-data"
                onSubmit={productReviewsIdSubmitHandler}
              >
                <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

                <div>
                  <StarIcon />
                  <input
                    type="text"
                    placeholder="Product ID"
                    required
                    name="productId"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  />
                </div>

                <Button
                  id="updateProductBtn"
                  type="submit"
                  disabled={
                    loading ? true : false || productId === "" ? true : false
                  }
                >
                  SEARCH
                </Button>
              </form>

              {reviews && reviews.length > 0 ? (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="productListTable"
                />
              ) : (
                <h1
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  NO REVIEWS FOUND
                </h1>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductReviews;
