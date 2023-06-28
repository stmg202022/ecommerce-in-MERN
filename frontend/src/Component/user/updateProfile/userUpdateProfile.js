import React, { Fragment, useEffect, useState } from "react";
import "./updateProfile.css";

// import AvatarPreview from "../../../images/profileImage.jpg";

//material ui
import EmailIcon from "@mui/icons-material/Email";
import AddReactionIcon from "@mui/icons-material/AddReaction";

//login Data sending/req.body  and receiving/res.data
import { useDispatch, useSelector } from "react-redux";
import {
  userChangeProfile,
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
import { UPDATE_PROFILE_RESET } from "../../../Redux/Constants/userConstant";
const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  //   console.log(user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  //image upload case
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/logo192.png");

  const { loading, isUpdated, error } = useSelector((state) => state.profile);

  console.log(
    "*********************************************************",
    loading
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      toast.error(error);
      dispatch(clearUserErrors());
    }

    if (isUpdated) {
      // console.log("==============authentication is done", isAuthenticated);

      dispatch(loadUser());
      navigate("/account");

      toast("UPDATE PROFILE SUCCESS.");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, user, isUpdated, navigate, error]);

  //   //loginSubmit for form submit
  //   const loginSubmit = (e) => {
  //     e.preventDefault();

  //     dispatch(login(loginEmail, loginPassword));

  //     console.log("Form submited.");
  //   };

  const updateDataChange = (e) => {
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
  };

  //updateSubmit
  const updateSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    console.log(
      "update form submit.]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]",
      myForm.get("name") + myForm.get("email")
    );

    dispatch(userChangeProfile(myForm));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">UPDATE PROFILE</h2>
              <form
                action=""
                className="updateProfileForm"
                encType="multipart/form-data" //we are going to upload user images so..
                onSubmit={updateSubmit}
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
                    onChange={(e) => setName(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    className="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={updateDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="UPDATE"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
