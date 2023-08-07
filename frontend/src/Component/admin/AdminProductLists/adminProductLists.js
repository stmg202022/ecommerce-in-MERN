import React, { Fragment, useEffect } from "react";
import "./adminProductLists.css";

import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "../Sidebar/sidebar";
import Loader from "../../layout/Loader/loader";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  adminGetAllProducts,
  adminDeleteProduct,
  clearError,
} from "../../../Redux/Actions/productActions";
import { useNavigate } from "react-router-dom";
import { DELETE_PRODUCT_RESET } from "../../../Redux/Constants/productConstant";

const AdminProductLists = () => {
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //
  const { products, productsCount, error, loading } = useSelector(
    (state) => state.adminProducts
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteProduct
  );

  const deleteProductHandler = (id) => {
    dispatch(adminDeleteProduct(id));
  };

  const columns = [
    {
      field: "id",
      headerName: "PRODUCT ID",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "name",
      headerName: "PRODUCT NAME",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "STOCK",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "price",
      headerName: "PRICE",
      type: "number",
      minWidth: 150,
      flex: 0.3,
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
              <EditIcon
                onClick={() => navigate(`/products/edit/${params.row.id}`)}
              />
            </Button>

            <Button>
              <DeleteIcon onClick={() => deleteProductHandler(params.row.id)} />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item, index) => {
      rows.push({
        id: item._id,
        name: item.name,
        stock: item.stock,
        price: item.price,
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(adminGetAllProducts());

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      toast("Product Deleted SuccessFully.");
      dispatch({ type: DELETE_PRODUCT_RESET });
      // navigate("/admin/dashboard");
    }
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  // const columns = [
  //   { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
  //   {
  //     field: "name",
  //     headerName: "Name",
  //     minWidth: 350,
  //     flex: 1,
  //   },
  //   {
  //     field: "stock",
  //     headerName: "Stock",
  //     minWidth: 350,
  //     flex: 1,
  //   },
  //   {
  //     field: "price",
  //     headerName: "Price",
  //     minWidth: 220,
  //     flex: 1,
  //   },

  //   {
  //     field: "actions",
  //     headerName: "Actions",
  //     minWidth: 150,
  //     type: "number",
  //     flex: 1,
  //     sortable: false,
  //     renderCell: (params) => {
  //       return (
  //         <Fragment>
  //           <div>
  //             <Link to={`/products/${params.row.id}`}>click</Link>
  //           </div>

  //           <div>
  //             <Button>
  //               <DeleteIcon />
  //             </Button>
  //           </div>
  //         </Fragment>
  //       );
  //     },
  //   },
  // ];

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="dashboard">
            <SideBar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL PRODUCTS: {productsCount}</h1>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AdminProductLists;
