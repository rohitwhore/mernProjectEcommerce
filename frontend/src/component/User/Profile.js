import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate(); // ✅ useNavigate instead of history.push()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // ✅ Redirect if not authenticated
    }
  }, [navigate, isAuthenticated]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <h2>No user data available. Please login.</h2>; // ✅ Handle null user safely
  }

  return (
    <Fragment>
      <MetaData title={`${user.name}'s Profile`} />
      <div className="profileContainer">
        <div>
          <h1>My Profile</h1>
          <img src={user.avatar?.url || "/default-avatar.png"} alt={user.name || "User"} />
          <Link to="/me/update">Edit Profile</Link>
        </div>
        <div>
          <div>
            <h4>Full Name</h4>
            <p>{user.name}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>
          <div>
            <h4>Joined On</h4>
            <p>{user.createdAt ? String(user.createdAt).substr(0, 10) : "N/A"}</p>
          </div>
          <div>
            <Link to="/orders">My Orders</Link>
            <Link to="/password/update">Change Password</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
