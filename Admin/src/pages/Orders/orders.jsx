import React, { useState, useEffect } from 'react';
import './orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoFastFood } from 'react-icons/io5';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error('Failed to fetch orders');
      }
    } catch (error) {
      toast.error('Error fetching orders');
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, { orderId, status: event.target.value });
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error('Failed to update order status');
      }
    } catch (error) {
      toast.error('Error updating order status');
      console.error('Error updating order status:', error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Details</h3>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className='order-list'>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} className='order-item'>
                <IoFastFood className='order-icon' />
                <div>
                  <p className='order-item-food'>
                    {order.items.map((item, index) => (
                      <span key={index}>
                        {item.name} x {item.quantity}
                        {index < order.items.length - 1 && ', '}
                      </span>
                    ))}
                  </p>
                  <p className='order-item-name'>{`${order.address.firstName} ${order.address.lastName}`}</p>
                  <div className='order-item-address'>
                    <p>{`${order.address.street}, `}</p>
                    <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.pincode}`}</p>
                  </div>
                  <p className="order-item-phone">{order.address.phone}</p>
                </div>
                <p>Items: {order.items.length}</p>
                <p>${order.amount}</p>
                <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))
          ) : (
            <p>No orders available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;

