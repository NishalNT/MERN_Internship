import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderList.css";
import { useNavigate } from "react-router-dom";


function OrderList() {
  const [orderList, setOrderList] = useState([]);

  const navigate = useNavigate();
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/order");
      console.log(response.data);
      setOrderList(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/order/" + orderId
      );
      alert(response.data);
      fetchData();
    } catch (error) {
      alert(error);
    }
  };

  const handleEdit = (orderId) => {
    navigate("/OrderForm/" + orderId);
  };

  return (
    <div>
      <table border={2}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Weight</th>
            <th>Box Color</th>
            <th>Destination</th>
            <th>Total Cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order) => {
            const bg = order.color;
            let ShipCost;
            if (order.dest === "Brazil") {
              ShipCost = 15.36;
            } else if(order.dest === "Sweden"){
              ShipCost = 7.35;
            } else if(order.dest === "China"){
              ShipCost = 11.53;
            } else if(order.dest === "Australia"){
              ShipCost = 50.09;
            }
            const total = Math.round(order.weight * ShipCost * 100) / 100;
            return (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.name}</td>
                <td>{order.weight} KG</td>
                <td>
                  <div
                    style={{
                      backgroundColor: bg,
                    }}
                    className="color"
                  ></div>
                </td>
                <td>{order.dest}</td>
                <td>{total} INR</td>
                <td>
                  <button onClick={() => handleEdit(order._id)}>Edit</button>
                  <button onClick={() => handleDelete(order._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
