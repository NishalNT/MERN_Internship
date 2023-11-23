const { response } = require("express");
const mongoose = require("mongoose");

const dotenv = require("dotenv").config();
mongoose.set("strictQuery", false);

mongoose.connect(process.env.DB_CONNECT, {

    useUnifiedTopology: true,

    useNewUrlParser: true,

})
.then((response) => {
    console.log("Connected to database")
})
.catch((error) => {
    console.log(error);
})