const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Order = require('../models/Order');

const app = express();
app.use(cors());

app.post("/api/order", async (req, res) => {
    try {
        const data = req.body;
        const createdOrder = new Order(data);
        await createdOrder.save();
        console.log("Order created:", createdOrder);
        res.status(201).json({ message: "Order Created", order: createdOrder });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/api/order", async (req, res) => {
    try {
        const orderList = await Order.find();
        res.status(200).json(orderList);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put("/api/order/:id", async (req, res) => {
    try {
        const data = req.body;
        await Order.updateOne({ _id: req.params.id }, { $set: data });
        console.log("Order Updated");
        res.status(200).send("Order Updated");
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete("/api/order/:id", async (req, res) => {
    try {
        await Order.deleteOne({ _id: req.params.id });
        console.log("Order Deleted");
        res.status(200).send("Order Deleted");
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = app;
