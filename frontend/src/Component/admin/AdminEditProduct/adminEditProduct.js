import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./adminUpdateProduct.css";

import { useParams, useNavigate } from "react-router-dom";
import {
  clearError,
  getProductDetails,
  adminUpdateProduct,
} from "../../../Redux/Actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../../Redux/Constants/productConstant";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Button } from "@mui/material";

import SideBar from "../Sidebar/sidebar";

const categories = [
  "Bike",
  "SmartPhone",
  "Camera",
  "Laptop",
  "Shoes",
  "T-Shirt",
];

const AdminUpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const { product, error } = useSelector((state) => state.productDetails);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const {
    error: updateError,
    isUpdated,
    loading,
  } = useSelector((state) => state.updateProduct);

  useEffect(() => {
    //
    if (!product || product._id !== id || isUpdated) {
      dispatch(getProductDetails({ id }));
      //
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
      // setImages(product.images);
      // console.log(product.images);
      setOldImages(product.images);
    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearError());
    }

    if (isUpdated) {
      toast("Updated product SuccessFully.");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, product, id, error, updateError, isUpdated, navigate]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("name", name);
    formData.set("price", price);
    formData.set("category", category);
    formData.set("description", description);
    formData.set("stock", stock);

    // if (images.length === 0) {
    //   product.images.forEach((image) => {
    //     formData.append("images", image.url);
    //   });
    // } else {
    //   images.forEach((image) => {
    //     formData.append("images", image);
    //   });
    // }

    // console.log(formData.get("images"));

    // // for (let itm of formData) {
    // //   console.log(itm);
    // // }

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(adminUpdateProduct(id, formData));

    // setName("");
    // setPrice("");
    // setCategory("");
    // setDescription("");
    // setImages([]);
    // setImagesPreview([]);
  };

  //USE THIS CODE TO READR IMAGES FILES
  const updateProductImageChange = (e) => {
    const files = Array.from(e.target.files);

    // setImages([]);
    // setImagesPreview([]);
    // setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="adminUpdateProductContainer">
          <form
            action=""
            className="adminUpdateProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price rupee.."
                required
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                rows="1"
                placeholder="Descriptions"
                required
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <AccountTreeIcon />
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="">Select Categories</option>
                {categories.map((cat) => {
                  return (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avater"
                accept="image/*"
                multiple
                onChange={updateProductImageChange}
              />
            </div>

            <div className="updateProductFormImage" id="updateProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview " />
              ))}
            </div>

            {oldImages && oldImages.length > 0 && (
              <div
                className="updateProductFormImage"
                id="updateProductFormImage"
              >
                {oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview " />
                ))}
              </div>
            )}

            <Button
              id="updateProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              UPDATE
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminUpdateProduct;
