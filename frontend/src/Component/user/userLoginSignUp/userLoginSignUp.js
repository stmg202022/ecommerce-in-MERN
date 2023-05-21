import React, { Fragment, useEffect, useRef, useState } from "react";
import "./userLoginSignUp.css";

import { Link } from "react-router-dom";

// import AvatarPreview from "../../../images/profileImage.jpg";

//material ui
import { Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AddReactionIcon from "@mui/icons-material/AddReaction";

//login Data sending/req.body  and receiving/res.data
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  clearUserErrors,
  register,
} from "../../../Redux/Actions/userActions";

//when login loading...
import Loader from "../../layout/Loader/loader";

//When login errorr...
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//When login Success...
import { useNavigate } from "react-router-dom";

const UserLoginSignUp = () => {
  //using useDispatch and useSelector for login/signUp data
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();

  //useRef Hook of react
  const loginTab = useRef(null); //formRef
  const switcherTab = useRef(null); //buttonRef
  const registerTab = useRef(null);

  //for { Email and password } login using useState Hook
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //for { name, email, password} register using useState Hook
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;

  //image upload case
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/logo192.png");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearUserErrors());
    }

    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch, error, navigate, isAuthenticated]);

  //
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      //button
      switcherTab.current.classList.add("shiftToNeutral"); // add: 0%
      switcherTab.current.classList.remove("shiftToRight"); // remove: 100%

      //register
      registerTab.current.classList.remove("shiftToNeutralForm"); // removeX: 0% removeY: -100%
      loginTab.current.classList.remove("shiftToLeft");
    }

    if (tab === "register") {
      //button
      switcherTab.current.classList.remove("shiftToNeutral");
      switcherTab.current.classList.add("shiftToRight");

      //register
      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  //loginSubmit for form submit
  const loginSubmit = (e) => {
    e.preventDefault();

    dispatch(login(loginEmail, loginPassword));

    console.log("Form submited.");
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(file);
      // reader.readAsDataURL(e.target.file[0]);f
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  //registerSubmit
  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    console.log("register form submit.", myForm);

    dispatch(register(myForm));
  };

  //
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="userLoginSignUpContainer">
          <div className="loginSignUpBox">
            <div>
              <div className="login_signUp_toggle">
                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
              </div>
              <Button ref={switcherTab}></Button>
            </div>

            <form
              action=""
              className="loginForm"
              ref={loginTab}
              onSubmit={loginSubmit}
            >
              <div className="loginEmail">
                <EmailIcon />
                <input
                  type="email"
                  className="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>

              <div className="loginPassword">
                <LockOpenIcon />
                <input
                  type="password"
                  className="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>

              <Link to="/password/forgot">Forgot Password ?</Link>
              <input type="submit" value="Login" className="loginBtn" />
            </form>

            <form
              action=""
              className="signUpForm"
              ref={registerTab}
              encType="multipart/form-data" //we are going to upload user images so..
              onSubmit={registerSubmit}
            >
              <div className="signUpName">
                <AddReactionIcon />
                <input
                  type="text"
                  name="name"
                  className="name"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={registerDataChange}
                />
              </div>

              <div className="signUpEmail">
                <EmailIcon />
                <input
                  type="email"
                  name="email"
                  className="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={registerDataChange}
                />
              </div>

              <div className="signUpPassword">
                <LockOpenIcon />
                <input
                  type="password"
                  name="password"
                  className="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={registerDataChange}
                />
              </div>

              <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  className="avatar"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>
              <input
                type="submit"
                value="Register"
                className="signUpBtn"
                // disabled={loading ? true : false}
              />
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UserLoginSignUp;
