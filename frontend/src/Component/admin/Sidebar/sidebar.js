import React from "react";
import "./sidebar.css";

import { Link } from "react-router-dom";
import Logo from "../../../images/meroshop.png";
import { TreeView, TreeItem } from "@mui/lab/";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={Logo} alt="Ecommerce" />
      </Link>

      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>

      <Link to="">
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultEndIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <div>
              <Link to="/admin/products">
                <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
              </Link>
            </div>
            <div>
              <Link to="/admin/createproduct">
                <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
              </Link>
            </div>
          </TreeItem>
        </TreeView>
      </Link>

      <Link to="/admin/orders">
        <p>
          <ListAltIcon /> Orders
        </p>
      </Link>

      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>

      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon /> Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
