import React, { useContext, useState } from 'react'
import './Navbar.css'
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci"
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { IoBagHandleOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("");

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate=useNavigate();

  const logout=()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  return (
    <div className='navbar'>
      <Link to='/'><h1 className='logo'>EatZilla.</h1></Link>
      <ul className="navbar-menu">
        <Link to='/' onMouseOver={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onMouseOver={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href='#app-download' onMouseOver={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-App</a>
        <a href='#footer' onMouseOver={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact-Us</a>
      </ul>
      <div className="navbar-right">
        <CiSearch className='icon' />
        <div className="navbar-search-icon">
          <Link to='/cart'> <CiShoppingCart className='icon' /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {
          !token ? <button onClick={() => setShowLogin(true)}>Sign In</button>
            :<div className='navbar-profile'>
                <CgProfile className='icon'/>
                <ul className="navbar-profile-dropdown">
                  <li onClick={()=>navigate("/myorders")}><IoBagHandleOutline className='icons'/>
                  <p>Orders</p>
                  </li>
                  <hr />
                  <li onClick={logout}><IoLogOutOutline className='icons'/>
                  <p>Logout</p>                  
                  </li>
                </ul>
            </div>
        }

      </div>
    </div>
  )
}

export default Navbar