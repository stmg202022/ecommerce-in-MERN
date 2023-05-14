import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./productDetails.css";
import {
  clearError,
  getProductDetails,
} from "../../../../Redux/Actions/productActions";
import { useParams } from "react-router-dom";
import Loader from "../../Loader/loader";
import Carousel from "react-material-ui-carousel";
import { Button } from "@mui/material";
import ReviewCart from "../../Reviewcart/review_cart";
// import { Paper } from "@mui/material";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReactStars from "react-rating-stars-component";
// import AlertDialog from "../../Alert/alert";

const ProductDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(getProductDetails({ id }));
  }, [dispatch, id, error]);

  // console.log(JSON.stringify(product, null, "\t"));

  // console.log(error);

  const options = {
    count: 5,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
    activeColor: "#ffd700",
    value: product ? Number(product.ratings) : 0,
    edit: false,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        // : error ? (
        //   <AlertDialog error={error} />
        // )
        product && (
          // <div className="product_details">
          //   <h1>{JSON.stringify(product)}</h1>
          // </div>

          <div className="productDetails">
            <div>
              <Carousel className="carouselIMage">
                {product.images &&
                  product.images.map((image, i) => (
                    <img
                      src={image.url}
                      key={image.url}
                      alt={`${i} slide`}
                      style={{ width: "100%", height: "450px" }}
                    />
                  ))}
              </Carousel>
            </div>
            <div className="details_block">
              <div className="details_block1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="details_block2">
                <ReactStars {...options} />
                <span>({`${product.numOfReviews} Reviews`})</span>
              </div>
              <div className="details_block3">
                <h1>{`NRS: ${product.price}`} /-</h1>

                <div className="details_block3-1">
                  <div className="details_block3-1-1">
                    <Button>-</Button>
                    <input type="number" value="1" />
                    <Button>+</Button>
                  </div>
                  <Button className="add_button">Add To Cart</Button>
                </div>
                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OUTOFSTOCK" : "INSTOCK"}
                  </b>
                </p>
              </div>
              <div className="details_block4">
                Descriptions: <p>{product.description}</p>
              </div>
              <div>
                <Button
                  style={{
                    backgroundColor: "tomato",
                    borderRadius: "20px",
                    margin: "1vmax 0",
                    transition: "all 0.5s",
                    outline: "none",
                    color: "white",
                  }}
                >
                  Submit Review
                </Button>
              </div>
            </div>
          </div>
        )
      )}

      <h3 className="reviewHeading">REVIEWS</h3>
      {product && product.reviews[0] ? (
        <div className="reviews">
          {product.reviews.map((review) => (
            <ReviewCart review={review} key={review._id} />
          ))}
        </div>
      ) : (
        <p className="noReviews">NO REVIEWS YET !!!</p>
      )}
    </Fragment>
  );
};

export default ProductDetails;
