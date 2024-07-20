import React from 'react'
import './Sidebar.css'
import { IoMdAdd } from "react-icons/io";
import { IoIosList } from "react-icons/io";
import { VscCheck } from "react-icons/vsc";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">

        <NavLink to='/add' className="sidebar-option">
          <IoMdAdd />
          <p>Add Items</p>
        </NavLink>

        <NavLink to='/list' className="sidebar-option">
          <IoIosList />
          <p>List Items</p>
        </NavLink>

        <NavLink to='/orders' className="sidebar-option">
          <VscCheck />
          <p>Orders</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar