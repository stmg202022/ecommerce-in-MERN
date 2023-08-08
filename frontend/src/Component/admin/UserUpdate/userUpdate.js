import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import {
  getSingleUsers,
  adminUpdateUser,
  clearUserErrors,
} from "../../../Redux/Actions/userActions";

import Sidebar from "../Sidebar/sidebar";
import { UPDATE_USERS_RESET } from "../../../Redux/Constants/userConstant";

// const roles = ["admin", "user"];

const UpdateUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { user, error } = useSelector((state) => state.singleUser);
  const {
    isUpdated,
    error: updateError,
    loading,
  } = useSelector((state) => state.updateUser);

  console.log("user by id:", user);

  useEffect(() => {
    if (!user || user._id !== id || isUpdated) {
      dispatch(getSingleUsers(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      toast.error(error);
      dispatch(clearUserErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearUserErrors());
    }

    if (isUpdated) {
      toast("User Updated SuccessFully.");
      dispatch({ type: UPDATE_USERS_RESET });
      navigate("/admin/users");
    }
  }, [dispatch, id, user, error, updateError, isUpdated, navigate]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(adminUpdateUser(id, myForm));
  };

  return (
    <Fragment>
      <div className="dashboard">
        <Sidebar />
        <div className="adminUpdateProductContainer">
          <form
            action=""
            className="adminUpdateProductForm"
            encType="multipart/form-data"
            onSubmit={updateUserSubmitHandler}
          >
            <h1>Update User</h1>

            <div>
              <AddReactionIcon />
              <input
                type="text"
                placeholder="User Name"
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <EmailIcon />
              <input
                type="email"
                placeholder="User Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <AccountCircleIcon />
              <select onChange={(e) => setRole(e.target.value)} value={role}>
                <option value="">{role}</option>
                {role === "user" ? (
                  <option key="admin" value="admin">
                    admin
                  </option>
                ) : (
                  <option key="user" value="user">
                    user
                  </option>
                )}

                {/* <option value="">Choose Role</option> */}
                {/* {roles.map((role) => {
                  return (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  );
                })} */}
              </select>
            </div>

            <Button
              id="updateProductBtn"
              type="submit"
              disabled={loading ? true : false || role === "" ? true : false}
            >
              UPDATE
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
