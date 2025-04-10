const app = require("./app");
const cloudinary = require("cloudinary");

const connectDatabase = require("./config/database");

// Load environment variables FIRST!
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({ path: "backend/config/config.env" });
}


// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

// Connect to database AFTER loading .env
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});


