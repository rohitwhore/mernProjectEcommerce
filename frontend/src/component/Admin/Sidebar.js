import React from "react";
import "./sidebar.css";
import logo from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { TreeView } from "@mui/x-tree-view";
import { TreeItem } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>

      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>

      {/* Styled TreeView */}
      <TreeView
        className="treeView"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ImportExportIcon />}
      >
        <TreeItem itemId="products" label="Products" className="treeItem">
          <TreeItem
            itemId="all-products"
            label={
              <span className="treeItemLink" onClick={() => navigate("/admin/products")}>
                <PostAddIcon /> All Products
              </span>
            }
          />
          <TreeItem
            itemId="create-product"
            label={
              <span className="treeItemLink" onClick={() => navigate("/admin/product")}>
                <AddIcon /> Create Product
              </span>
            }
          />
        </TreeItem>
      </TreeView>

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
