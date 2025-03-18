import React from "react";
import "./Contact.css";
import { Button } from "@mui/material";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:mymailforrohit@gmail.com" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary">
          Contact: mymailforrohit@gmail.com
        </Button>
      </a>
    </div>
  );
};

export default Contact;
