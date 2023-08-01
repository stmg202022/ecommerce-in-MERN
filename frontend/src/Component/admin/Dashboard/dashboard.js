import React, { Fragment } from "react";
import Sidebar from "../Sidebar/sidebar.js";

import "./dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

import LineChart from "../chart/lineChart.js";
import DoughnutChart from "../chart/doughnutChart.js";

const Dashboard = () => {
  //

  const data = {
    labels: ["Initial Amount", "Total Amount"],
    datasets: [
      {
        label: "Amount",
        data: [0, 4000],
        borderColor: "rgb(75, 192, 192)",
        fill: false,
      },
    ],
  };

  const data2 = {
    labels: ["OUTOFSTOCK", "INSTOCK"],
    datasets: [
      {
        data: [10, 30],
        backgroundColor: ["red", "blue"],
      },
    ],
  };

  //
  return (
    <Fragment>
      <div className="dashboard">
        <Sidebar />

        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>
          <div className="dashboardSummery">
            <div>
              <p>
                Total Amount <br /> Rs. 4000
              </p>
            </div>
            <div className="dashboardSummeryBox2">
              <Link to="/admin/products">
                <p>Products</p>
                <p>50</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>4</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>2</p>
              </Link>
            </div>
          </div>
          <div className="lineChart">
            {/* <h1>Line Chart </h1> */}
            <LineChart data={data} />
          </div>
          <br />
          <div className="doughnutChart">
            {/* <h1>Doughnut Chart </h1> */}
            <DoughnutChart data={data2} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
