import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import "./style/order_style.scss";

const Orders = () => {
    const { currentUser } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!currentUser?.id) {
                console.log("User not found");
                return;
            }
            try {
                const res = await axios.get(`http://localhost:8800/api/orders/orders/${currentUser.id}`);
                setOrders(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Error fetching user orders:", err);
            }
        };
        fetchOrders();
    }, [currentUser]);

    const handleDelete = async (orderId) => {
        try {
          await axios.delete(`http://localhost:8800/api/orders/${orderId}`);
          setOrders(orders.filter(order => order.id !== orderId));
        } catch (err) {
          console.error("Error canceling order:", err);
        }
    };

    const handleConfirm = async (orderId) => {
        try {
            const response = await axios.put(`http://localhost:8800/api/orders/${orderId}`);
            if (response.data === "Order confirmed successfully") {
                setOrders(
                    orders.map(order => 
                        order.id === orderId ? { ...order, status: 'confirmed' } : order
                    )
                );
            }
        } catch (err) {
            console.error("Error confirming order:", err);
        }
    };

    return (
        <div className="orders_user">
            <h2>YOUR ORDERS:</h2>
            <div className="orders-list">
                {Array.isArray(orders) && orders.length > 0 ? (
                    orders.map((order) => (
                        <div className="order" key={order.id}>
                            <div className="order-details">
                                <span>{new Date(order.order_date).toLocaleDateString()}</span>
                                <span>{order.total_price}</span>
                                <span>{order.status}</span>
                            </div>
                            <div className="post-actions">
                                <button className="confirm-btn" onClick={() => handleConfirm(order.id)}>CONFIRM</button>
                                <button className="delete-btn" onClick={() => handleDelete(order.id)}>CANCEL</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No orders available.</p>
                )}
            </div>
        </div>
    );
};

export default Orders;
