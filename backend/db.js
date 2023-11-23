const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose.connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
