import React, { Fragment, useEffect, useState } from "react";
import "./updatePassword.css";
//login Data sending/req.body  and receiving/res.data
import { useDispatch, useSelector } from "react-redux";
import {
  userChangePassword,
  clearUserErrors,
  loadUser,
} from "../../../Redux/Actions/userActions";

//when login loading...
import Loader from "../../layout/Loader/loader";

//When login errorr...
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//When login Success...
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../../Redux/Constants/userConstant";

import LockOpenIcon from "@mui/icons-material/LockOpen";
import KeyIcon from "@mui/icons-material/Key";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

const UpdatePassword = () => {
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isUpdated, error } = useSelector((state) => state.profile);

  console.log(
    "*********************************************************",
    loading
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearUserErrors());
    }

    if (isUpdated) {
      // console.log("==============authentication is done", isAuthenticated);

      dispatch(loadUser());
      navigate("/account");

      toast("UPDATE PASSWORD SUCCESS.");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate]);

  const updateSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    console.log(
      "update form submit.]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]",
      myForm.get("oldPassword") + myForm.get("newPassword")
    );

    dispatch(userChangePassword(myForm));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">UPDATE PASSWORD</h2>
              <form
                action=""
                className="updatePasswordForm"
                encType="multipart/form-data" //we are going to upload user images so..
                onSubmit={updateSubmit}
              >
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    className="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    className="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <KeyIcon />
                  <input
                    type="password"
                    className="password"
                    placeholder="Confirmed Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="UPDATE"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
