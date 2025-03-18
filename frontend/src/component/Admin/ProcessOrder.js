import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography, Button, Select, MenuItem } from "@mui/material";
import SideBar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import { getOrderDetails, clearErrors, updateOrder } from "../../actions/orderAction";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import "./processOrder.css";

const ProcessOrder = () => {
  const { id } = useParams(); // Get order ID from URL
  const navigate = useNavigate(); // React Router v6 navigation

  const dispatch = useDispatch();
  const alert = useAlert();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
      navigate("/admin/orders"); // Redirect after update
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError, navigate]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(id, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div className="confirmOrderPage" style={{ display: order.orderStatus === "Delivered" ? "block" : "grid" }}>
              {/* Shipping Info */}
              <div>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p className={order.paymentInfo && order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"}>
                        {order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}
                      </p>
                    </div>
                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  {/* Order Status */}
                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p className={order.orderStatus === "Delivered" ? "greenColor" : "redColor"}>
                        {order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cart Items */}
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                          <span>
                            {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Process Order Form */}
              <div style={{ display: order.orderStatus === "Delivered" ? "none" : "block" }}>
                <form className="updateOrderForm" onSubmit={updateOrderSubmitHandler}>
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <Select value={status} onChange={(e) => setStatus(e.target.value)} displayEmpty fullWidth>
                      <MenuItem value="">Choose Status</MenuItem>
                      {order.orderStatus === "Processing" && <MenuItem value="Shipped">Shipped</MenuItem>}
                      {order.orderStatus === "Shipped" && <MenuItem value="Delivered">Delivered</MenuItem>}
                    </Select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={loading || status === ""}
                    variant="contained"
                    color="primary"
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
