import { useEffect, useState } from "react";
import api from "../services/api";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/user");
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load orders.");
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Order History</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {!orders.length ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div className="card mb-3" key={order._id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h6>Order ID: {order._id}</h6>
                <span className={`badge ${order.status === "Completed" ? "bg-success" : "bg-warning text-dark"}`}>
                  {order.status}
                </span>
              </div>
              <ul className="mb-2 mt-2">
                {order.items.map((item) => (
                  <li key={item.foodId}>{item.name} x {item.quantity}</li>
                ))}
              </ul>
              <strong>Total: ${order.totalPrice.toFixed(2)}</strong>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
