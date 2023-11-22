const express = require('express');
const app = express();
const PORT = 5000;
const Order = require('./models/Order');

const cors = require('cors');

require('./db');
app.use(express.json());
app.use(cors());

app.listen(PORT, function () {
    console.log("Server is running on localhost:" + PORT);
});



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


//get the Order by id
app.get("/order/:id", async (req,res) => {
    try {
        const Order = await Order.findById({ _id: req.params.id });
        res.send(Order);
    } catch (error) {
        res.send(error);
    }
});