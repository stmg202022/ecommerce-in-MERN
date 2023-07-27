import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
// import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ViewListIcon from "@mui/icons-material/ViewList";

import ProfileImage from "../../../images/profileImage.jpg";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { logoutUser } from "../../../Redux/Actions/userActions";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "relative",
  top: "131px",
}));

const UserOptions = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  console.log(user.avatar.url);
  const avatar = user && user.avatar.url;
  console.log(ProfileImage);

  const actions = [
    { icon: <ViewListIcon />, name: "Orders", fun: order },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "none" }}
        />
      ),
      name: `Cart (${cartItems.length})`,
      fun: cart,
    },
    { icon: <AccountCircleIcon />, name: "Account", fun: account },
    { icon: <LogoutIcon />, name: "Logout", fun: logout },
    // { icon: <ShareIcon />, name: "Share" },
  ];

  if (user.role === "admin") {
    actions.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      fun: dashBoard,
    });
  }

  function dashBoard() {
    navigate("/dashboard");
  }

  async function account() {
    navigate("/account");
  }

  function cart() {
    navigate("/cart");
  }

  function order() {
    navigate("/orders");
  }

  async function logout() {
    // navigate("/logout");
    dispatch(logoutUser());

    toast("LOGOUT SUCESS.");

    navigate("/login");
  }

  return (
    <Box sx={{ position: "relative", height: 320 }}>
      <StyledSpeedDial
        ariaLabel="SpeedDial playground example"
        icon={
          avatar && (
            <img
              src={avatar ? avatar : ProfileImage}
              alt="Avatar"
              style={{ overflow: "hidden", borderRadius: "100%" }}
            />
          )
        }
        direction="down"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.fun}
          />
        ))}
      </StyledSpeedDial>
    </Box>
  );
};

export default UserOptions;
