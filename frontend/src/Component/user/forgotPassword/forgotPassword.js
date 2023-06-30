import React, { Fragment, useEffect, useState } from "react";
import "./forgotPassword.css";
//login Data sending/req.body  and receiving/res.data
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  clearUserErrors,
} from "../../../Redux/Actions/userActions";

//when login loading...
import Loader from "../../layout/Loader/loader";

//When login errorr...
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//When login Success...
// import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";

const ForgotPassword = () => {
  //
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  //
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearUserErrors);
    }

    if (message) {
      toast(message);
    }
  }, [dispatch, error, message]);

  //
  const [email, setEmail] = useState("");

  //loginSubmit for form submit
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(email));

    // navigate("/resetPassword");
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">FORGOT PASSWORD</h2>
              <form
                action=""
                className="forgotPasswordForm"
                // encType="multipart/form-data" //we are going to upload user images so..
                onSubmit={forgotPasswordSubmit}
              >
                <div className="signUpEmail">
                  <EmailIcon />
                  <input
                    type="email"
                    name="email"
                    className="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="SEND"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
