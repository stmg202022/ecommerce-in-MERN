// when we go to the path "/password/reset/:token" render the ResetPassword component and token = useParams()
//after updateSubmit token go to the resetPassword actions with passwords obj.
// The path is go from the email https link // The backend is on localhost 8080 so set it localhost 3000 to run it.

import React, { Fragment, useEffect, useState } from "react";
import "./resetPassword.css";
//login Data sending/req.body  and receiving/res.data
import { useDispatch, useSelector } from "react-redux";
import {
  resetPassword,
  clearUserErrors,
  //   loadUser,
} from "../../../Redux/Actions/userActions";

//when login loading...
import Loader from "../../layout/Loader/loader";

//When login errorr...
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//When login Success...
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../../Redux/Constants/userConstant";

import KeyIcon from "@mui/icons-material/Key";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

const ResetPassword = () => {
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();

  const { loading, success, error } = useSelector(
    (state) => state.forgotPassword
  );

  console.log(
    "*********************************************************",
    loading
  );

  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearUserErrors());
    }

    if (success) {
      // console.log("==============authentication is done", isAuthenticated);

      //   dispatch(loadUser());

      toast("UPDATE PASSWORD SUCCESS.");

      navigate("/login");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, success, navigate]);

  const updateSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    console.log(
      "update form submit.]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]",
      myForm.get("password") + myForm.get("confirmPassword")
    );

    dispatch(resetPassword(token, myForm));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">RESET PASSWORD</h2>
              <form
                action=""
                className="resetPasswordForm"
                onSubmit={updateSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    className="password"
                    placeholder="New Password"
                    required
                    value={password}
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
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
