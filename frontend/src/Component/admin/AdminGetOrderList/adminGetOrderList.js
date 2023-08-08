import React, { Fragment, useEffect } from "react";
import "./adminGetOrderList.css";

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
  adminGetAllOrders,
  adminDeleteOrders,
  clearError,
} from "../../../Redux/Actions/orderActions";

import { DELETE_ORDER_RESET } from "../../../Redux/Constants/orderConstant";
import { useNavigate } from "react-router-dom";

const AdminGetOrderList = () => {
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //
  const { orders, loading, error } = useSelector((state) => state.allOrders);

  console.log("orders list are >>>>>>>>>>>", orders);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteOrders
  );

  const deleteOrderHandler = (id) => {
    dispatch(adminDeleteOrders(id));
  };

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },

    {
      field: "itemsQty",
      headerName: "Item Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
                onClick={() => navigate(`/admin/updateOrders/${params.row.id}`)}
              />
            </Button>

            <Button>
              <DeleteIcon onClick={() => deleteOrderHandler(params.row.id)} />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(adminGetAllOrders());

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      toast("Order Deleted SuccessFully.");
      dispatch({ type: DELETE_ORDER_RESET });
      navigate("/admin/orders");
    }
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="dashboard">
            <SideBar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL Orders: {orders.length} </h1>
              <DataGrid
                style={{ width: "90%" }}
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

export default AdminGetOrderList;
