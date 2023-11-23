const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

require('./db'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Uncomment the following line if you have static files in a 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

const Order = require('./models/Order');

app.post("/order", async (req, res) => {
    try {
        const data = req.body;
        const createdOrder = new Order(data);
        await createdOrder.save();
        console.log("Order created:", createdOrder);
        res.send("Order Created");
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.get("/order", async (req, res) => {
    try {
        const orderList = await Order.find();
        res.send(orderList);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.put("/order/:id", async (req, res) => {
    try {
        const data = req.body;
        await Order.updateOne({ _id: req.params.id }, { $set: data });
        console.log("Order Updated");
        res.send("Order Updated");
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.delete("/order/:id", async (req, res) => {
    try {
        await Order.deleteOne({ _id: req.params.id });
        console.log("Order Deleted");
        res.send("Order Deleted");
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

module.exports = app;
