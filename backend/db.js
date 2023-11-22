const { response } = require("express");
const mongoose = require("mongoose");


mongoose.connect(
    "mongodb+srv://nishalnthingalaya1:65VhOBwWOiFXkqPE@cluster0.epr1y3v.mongodb.net/Order?retryWrites=true&w=majority"
)
.then((response) => {
    console.log("Connected to database")
})
.catch((error) => {
    console.log(error);
})