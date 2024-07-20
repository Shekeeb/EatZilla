import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className='footer-content-left'> 
            <h1>EatZilla.</h1>
            <p>"There is no sincere love than the love of food."</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
            </div>
            <div className='footer-content-right'>
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className='footer-content-center'>
                <h2>Get In Touch</h2>
                <ul>
                    <li>+91 8714535257</li>
                    <li>Eatzilla@gmail.com</li>
                    <li>Malappuram,Kerala</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className="footer-copyrights">Copyright 2024 © EatZilla ™ Ltd - All Rights Reserved</p>
    </div>
  )
}

export default Footer