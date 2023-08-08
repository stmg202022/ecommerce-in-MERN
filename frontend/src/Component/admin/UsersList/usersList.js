import React, { Fragment, useEffect } from "react";
import Sidebar from "../Sidebar/sidebar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../layout/Loader/loader";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  getAllUsers,
  adminDeleteUser,
  clearUserErrors,
} from "../../../Redux/Actions/userActions";
import { DELETE_USERS_RESET } from "../../../Redux/Constants/userConstant";

//
const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, loading, error } = useSelector((state) => state.allUsers);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.deleteUser
  );
  console.log(users);

  useEffect(() => {
    // if (!users) {
    //   dispatch(getAllUsers());
    // }

    if (error) {
      toast.error(error);
      dispatch(clearUserErrors());
    }

    dispatch(getAllUsers());

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearUserErrors());
    }

    if (isDeleted) {
      toast("User Deleted SuccessFully.");
      dispatch({ type: DELETE_USERS_RESET });
      navigate("/admin/users");
    }
  }, [dispatch, error, isDeleted, navigate, deleteError]);

  const deleteUserHandler = (id) => {
    dispatch(adminDeleteUser(id));
  };

  const columns = [
    {
      field: "id",
      headerName: "USER ID",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "name",
      headerName: "USER NAME",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Emali",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "ROLE",
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
                onClick={() => navigate(`/user/update/${params.row.id}`)}
              />
            </Button>

            <Button>
              <DeleteIcon onClick={() => deleteUserHandler(params.row.id)} />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((user, index) => {
      rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="dashboard">
            <Sidebar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL PRODUCTS: </h1>
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

export default UsersList;
