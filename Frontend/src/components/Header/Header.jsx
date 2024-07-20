import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-content">
            <h2>Order Your <br /> Favourite Food here...</h2>
            <p>"One cannot think well, love well, sleep well, <br /> if one hasn't dined well."</p>
            <button>View Menu</button>
        </div>
    </div>
  )
}

export default Header