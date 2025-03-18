import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

const About = () => {
  const visitInstagram = () => {
    window.open("https://instagram.com/royrohyt", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography variant="h4" component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              sx={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dgobuct3t/image/upload/v1742157427/IMG_20210508_000103_notnzz.jpg"
              alt="Founder"
            />
            <Typography variant="h6">Rohit Roy</Typography>
            <Button variant="contained" color="primary" onClick={visitInstagram}>
              Visit Instagram
            </Button>
            <Typography variant="body1" sx={{ marginTop: "1vmax" }}>
              This is a sample website made by @rohitroy, built to learn MERN Stack.
            </Typography>
          </div>

          <div className="aboutSectionContainer2">
            <Typography variant="h5" component="h2">Our Brands</Typography>
            <a href="" 
               target="_blank" rel="noopener noreferrer">
              <YouTubeIcon className="youtubeSvgIcon" sx={{ fontSize: "3rem", color: "red" }} />
            </a>
            <a href="https://instagram.com/royrohyt" 
               target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="instagramSvgIcon" sx={{ fontSize: "3rem", color: "#E4405F" }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
