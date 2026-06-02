import { useEffect, useState } from "react";
import api from "../../services/api";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const { data } = await api.get("/orders");
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/orders/${id}`, { status });
      loadOrders();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (loading) return <div className="text-center py-5">Loading orders...</div>;

  return (
    <div>
      <div className="mb-5">
        <h2>Order Management</h2>
        <p className="text-white-50">View and update the status of active customer orders.</p>
      </div>

      <div className="admin-card p-0 overflow-hidden">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items Count</th>
                <th>Total Price</th>
                <th>Status</th>
                <th className="text-end">Update Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td><code className="text-secondary">#{order._id.slice(-8).toUpperCase()}</code></td>
                  <td>
                    <div className="fw-bold">{order.userId?.name || "Guest User"}</div>
                    <div className="small text-white-50">{order.userId?.email}</div>
                  </td>
                  <td>{order.items?.length || 0} Items</td>
                  <td>₹{order.totalPrice.toFixed(2)}</td>
                  <td>
                    <span className={`status-pill ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="text-end">
                    <select 
                      className="admin-input py-1 px-2" 
                      style={{ width: 'auto', display: 'inline-block' }}
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .status-pill {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .status-pill.pending { background: rgba(255, 193, 7, 0.1); color: #ffc107; }
        .status-pill.processing { background: rgba(13, 110, 253, 0.1); color: #0d6efd; }
        .status-pill.completed { background: rgba(25, 135, 84, 0.1); color: #198754; }
        .status-pill.cancelled { background: rgba(220, 53, 69, 0.1); color: #dc3545; }
      `}</style>
    </div>
  );
};

export default OrderManagement;
