import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2
    }
    let response=await axios.post(url+"/api/order/placeorder",orderData,{headers:{token}});
    if (response.data.success) {
      const {session_url}=response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error..!")
    }
    navigate("/order");
  };

  const navigate1=useNavigate();

  useEffect(()=>{
    if (!token) {
      navigate1("/cart");
    }
    else if(getTotalCartAmount()===0){
      navigate1("/cart");
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p>Delivery Details</p>

        <div className="multi-fields">
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' required />
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>

        <div>
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='E-mail' required />
          <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required />
        </div>

        <div className="multi-fields">
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required />
          <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required />
        </div>

        <div className="multi-fields">
          <input name='pincode' onChange={onChangeHandler} value={data.pincode} type="text" placeholder='Pin Code' required />
          <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required />
        </div>

        <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' required />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
            </div>

          </div>
          <button type='submit'>Proceed to Checkout</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
