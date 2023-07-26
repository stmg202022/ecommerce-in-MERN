import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./orderSuccess.css";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>Your Order has been Placed Successfully</Typography>
      <Link to="/order/me">View My Order</Link>
    </div>
  );
};

export default Success;
