import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./productDetails.css";
import {
  clearError,
  // clearError,
  getProductDetails,
  newReview,
} from "../../../../Redux/Actions/productActions";
import { useParams } from "react-router-dom";
import Loader from "../../Loader/loader";
import Carousel from "react-material-ui-carousel";
import { Button } from "@mui/material";
import ReviewCart from "../../Reviewcart/review_cart";
// import { Paper } from "@mui/material";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import ReactStars from "react-rating-stars-component";
// import AlertDialog from "../../Alert/alert";

//ADDING ITEMS TO CART FROM CARTACTION
import { addItemsToCart } from "../../../../Redux/Actions/cartActions";

//For PRODUCT REVIEW
import Rating from "@mui/material/Rating";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../../../Redux/Constants/productConstant";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  //FOR DIALOG OPEN/CLOSE
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  useEffect(() => {
    // if (error) {
    //   toast.error(error);
    //   dispatch(clearError());
    // }
    dispatch(getProductDetails({ id }));

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearError());
    }

    if (success) {
      toast("Successful added review.");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, id, error, reviewError, success]);

  // console.log(JSON.stringify(product, null, "\t"));

  // console.log(error);

  const options = {
    size: "medium",
    value: product ? Number(product.ratings) : 0,
    readOnly: true,
  };

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return 1;
    setQuantity(quantity - 1);
  };

  const addToCartItem = () => {
    dispatch(addItemsToCart(id, quantity));
    toast("product added to Cart.");
  };

  const SubmitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = (e) => {
    // console.log("rating:", rating);
    // console.log("comment:", comment);
    // console.log("id:", id);

    let myReviewForm = new FormData();

    myReviewForm.set("rating", rating.toString());
    myReviewForm.set("comment", comment);
    myReviewForm.set("productId", id);

    // console.log(myForm)

    // for (const pair of myForm.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    // let myReviewForm = {
    //   rating: rating.toString(),
    //   comment: comment,
    //   productId: id
    // }

    dispatch(newReview(myReviewForm));

    setOpen(false);
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
                <Rating {...options} />
                <span>({`${product.numOfReviews} Reviews`})</span>
              </div>
              <div className="details_block3">
                <h1>{`NRS: ${product.price}`} /-</h1>

                <div className="details_block3-1">
                  <div className="details_block3-1-1">
                    <Button onClick={decreaseQuantity}>-</Button>
                    <input type="number" value={quantity} readOnly />
                    <Button onClick={increaseQuantity}>+</Button>
                  </div>
                  <Button
                    className="add_button"
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartItem}
                  >
                    Add To Cart
                  </Button>
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
                  color="primary"
                  onClick={SubmitReviewToggle}
                >
                  Submit Review
                </Button>
              </div>
            </div>
          </div>
        )
      )}

      <h3 className="reviewHeading">REVIEWS</h3>
      <Dialog open={open} onClose={SubmitReviewToggle}>
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="submitDialog">
          <Rating
            name="simple-controlled"
            size="large"
            value={rating}
            onChange={(event) => {
              setRating(Number(event.target.value));
            }}
          />

          <textarea
            autoFocus
            margin="dense"
            id="name"
            label="review"
            type="text"
            value={comment}
            variant="standard"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={SubmitReviewToggle} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={reviewSubmitHandler}
            style={{
              backgroundColor: "tomato",
              borderRadius: "20px",
              margin: "1vmax 0",
              transition: "all 0.5s",
              outline: "none",
              color: "white",
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

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
