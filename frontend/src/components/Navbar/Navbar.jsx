import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <div className='header'>
        <Link to={"/OrderList"}>Order List</Link>
        <Link to={"/Order"}>Order Form</Link>
    </div>
  )
}

export default Navbar