const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        name: String,
        weight: Number,
        color: String,
        dest: String
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);