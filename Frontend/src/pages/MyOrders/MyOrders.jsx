import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { IoFastFood } from "react-icons/io5";

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
            setData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='myorders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => (
                    <div key={index} className="myorders-order">
                        <IoFastFood className='order-icon' />
                        <p>
                            {order.items && order.items.map((item, itemIndex) => (
                                itemIndex === order.items.length - 1
                                    ? `${item.name} x${item.quantity}`
                                    : `${item.name} x${item.quantity}, `
                            ))}
                        </p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items ? order.items.length : 0}</p>
                        <p><span>&#x25cf;    </span>  {order.status}</p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyOrders;
