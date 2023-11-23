const express = require('express');
const app = express();
const PORT = 5000;
const Order = require('./models/Order');
const path = require('path');

const cors = require('cors');

require('./db');
app.use(express.json());
app.use(express.static(path.join(__dirname + "/public")))
app.use(cors());


app.post("/order", async (req, res) => {
    try {
        const data = req.body;
        const createdOrder = new Order(data);
        await createdOrder.save();
        res.send("Order Created");
    }catch(error){
        res.send(error);
    }
});


app.get("/order", async (req,res) => {
    try {
        const orderList = await Order.find();
        res.send(orderList);
    } catch (error) {
        res.send(error);
    }
});


//update using put
app.put("/order/:id", async (req,res) => {
    try {
        const data = req.body;
        await Order.updateOne({_id: req.params.id}, { $set: data });
        res.send("Order Updated");
    } catch (error) {
        res.send(error);
    }
});

//delete operation
app.delete("/order/:id", async (req,res) => {
    try {
        await Order.deleteOne({_id: req.params.id});
        res.send("Order Deleted");
    } catch (error) {
        res.send(error);
    }
});

//get the order by id
app.get("/order/:id", async (req,res) => {
    try {
        const order = await Order.findById({ _id: req.params.id });
        res.send(order);
    } catch (error) {
        res.send(error);
    }
});

app.listen(PORT, function () {
    console.log("Server is running on localhost:" + PORT);
});
