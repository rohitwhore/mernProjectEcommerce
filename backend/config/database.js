const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI); // ✅ Use MONGO_URI instead of DB_URI
        console.log(`MongoDB connected with server: ${connection.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to database: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDatabase;
