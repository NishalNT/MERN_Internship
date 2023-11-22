import React, { useEffect, useState } from "react";
import "./OrderForm.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function OrderForm() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");
  const [dest, setDest] = useState("");

  const [orderId, setOrderId] = useState(null);

  const params = useParams();

  console.log(params);

  useEffect(() => {
    if (params && params.id) {
      setOrderId(params.id);
      getOrderById(params.id);
    } else {
      setOrderId(null);
    }
  }, [params]);

  const getOrderById = async (orderId) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/order/" + orderId
      );
      const orderData = response.data;

      setName(orderData.name);
      setWeight(orderData.weight);
      setColor(orderData.color);
      setDest(orderData.dest);
    } catch (error) {
      alert(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      weight: weight,
      color: color,
      dest: dest,
    };
    console.log(data);
    try {
      //creating the user
      const response = await axios.post("http://localhost:5000/order", data);
      alert(response.data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Shipping Box</h2>
        <div className="content">
          <div className="input-box">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              pattern="[A-Za-z\s]+"
              title="Cannot have a number"
            />
          </div>
          <div className="input-box">
            <label htmlFor="usn">Weight</label>
            <input
              type="number"
              placeholder="Enter the weight in KG"
              required
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="input-box">
            <label htmlFor="email">Select the Color Box</label>
            <input
              className="clr"
              type="color"
              placeholder="Select The Color"
              required
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="input-box">
            <label htmlFor="phone">Destination</label>
            <select
              id="dest"
              required
              value={dest}
              onChange={(e) => setDest(e.target.value)}
            >
              <option value="Country">Select Country</option>
              <option value="Sweden">Sweden(7.35 INR)</option>
              <option value="China">China(11.53 INR)</option>
              <option value="Brazil">Brazil(15.63 INR)</option>
              <option value="Australia">Australia(50.09 INR)</option>
            </select>
          </div>
          <button type="submit" className="btn">
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrderForm;
