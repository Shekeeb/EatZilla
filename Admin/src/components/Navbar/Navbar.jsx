import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div>
      <h1>EatZilla.</h1>
      <h4>Admin Panel</h4>
      </div>
      <div className="navbar-profile">
      <img src={assets.profile} alt="" className='navbar-profile-container'/>
      </div>
        
    </div>
  )
}

export default Navbar