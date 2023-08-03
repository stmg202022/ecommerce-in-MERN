import React, { Fragment, useEffect, useState } from "react";
import "./adminCreateProduct.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  adminCreateProduct,
} from "../../../Redux/Actions/productActions";
import { useNavigate } from "react-router-dom";

import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SideBar from "../Sidebar/sidebar";
import { CREATE_PRODUCT_RESET } from "../../../Redux/Constants/productConstant";
import { Button } from "@mui/material";

const categories = [
  "Bike",
  "SmartPhone",
  "Camera",
  "Laptop",
  "Shoes",
  "T-Shirt",
];

const AdminCreateProduct = () => {
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { error, success, loading } = useSelector(
    (state) => state.createProduct
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (success && isSubmit) {
      toast("Successfully added.");
      setIsSubmit(false); // Reset isSubmit to false after showing the toast
      navigate("/admin/dashboard");
      dispatch({ type: CREATE_PRODUCT_RESET });
    }
  }, [dispatch, error, success, isSubmit, navigate]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("name", name);
    formData.set("price", price);
    formData.set("category", category);
    formData.set("description", description);
    formData.set("stock", stock);

    images.forEach((image) => {
      formData.append("images", image);
    });

    for (let itm of formData) {
      console.log(itm);
    }

    dispatch(adminCreateProduct(formData));

    setIsSubmit(true);

    setName("");
    setPrice("");
    setCategory("");
    setDescription("");
    setImages([]);
    setImagesPreview([]);
  };

  //USE THIS CODE TO READR IMAGES FILES
  const createProductImageChange = (e) => {
    const files = Array.from(e.target.files);

    // setImages([]);
    // setImagesPreview([]);

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
        <div className="createNewProductContainer">
          <form
            action=""
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

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
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Categories</option>
                {categories.map((cat) => {
                  return (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  );
                })}
                {/* // */}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avater"
                accept="image/*"
                multiple
                onChange={createProductImageChange}
              />
            </div>

            <div className="createProductFormImage" id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Avatar Preview " />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminCreateProduct;
