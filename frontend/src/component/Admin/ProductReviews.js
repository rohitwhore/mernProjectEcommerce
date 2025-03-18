import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button, TextField } from "@mui/material";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import SideBar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  // Provide a fallback to avoid undefined errors
  const { error: deleteError, isDeleted } = useSelector((state) => state.review) || {};
  const { error, reviews = [], loading } = useSelector((state) => state.productReviews) || {};

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    if (productId) {
      dispatch(deleteReviews(reviewId, productId));
    }
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    } else {
      alert.error("Invalid Product ID");
    }
  };

  useEffect(() => {
    console.log("Redux State:", { productReviews: reviews });

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      history.push("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, history, isDeleted, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    { field: "user", headerName: "User", minWidth: 200, flex: 0.6 },
    { field: "comment", headerName: "Comment", minWidth: 350, flex: 1 },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => (params.row.rating >= 3 ? "greenColor" : "redColor"),
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Button onClick={() => deleteReviewHandler(params.row.id)} color="error">
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  const rows = reviews.map((item) => ({
    id: item._id,
    rating: item.rating,
    comment: item.comment,
    user: item.name,
  }));

  return (
    <Fragment>
      <MetaData title="ALL REVIEWS - Admin" />
      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form className="productReviewsForm" onSubmit={productReviewsSubmitHandler}>
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>
            <div>
              <StarIcon />
              <TextField
                fullWidth
                label="Product Id"
                variant="outlined"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading || productId === ""}
            >
              Search
            </Button>
          </form>
          {reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;