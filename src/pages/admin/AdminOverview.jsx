import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const AdminOverview = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    orders: 0,
    users: 0,
    foods: 0,
    offers: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [foods, orders, users] = await Promise.all([
          api.get("/foods"),
          api.get("/orders"),
          api.get("/users").catch(() => ({ data: [] })) // Fallback if user route not yet implemented
        ]);
        
        setStats({
          orders: orders.data.length,
          users: users.data.length || 12, // Dummy if not implement
          foods: foods.data.length,
          offers: 4 // Dummy for now
        });
        setRecentOrders(orders.data.slice(0, 5));
      } catch (err) {
        console.error("Overview error:", err);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    { label: "Total Orders", value: stats.orders, icon: "🛒", color: "#d4af37" },
    { label: "Total Users", value: stats.users, icon: "👥", color: "#ff6b35" },
    { label: "Menu Items", value: stats.foods, icon: "🍔", color: "#4caf50" },
    { label: "Active Offers", value: stats.offers, icon: "🏷️", color: "#2196f3" },
  ];

  return (
    <div>
      <div className="mb-5">
        <h2 className="mb-2">Dashboard Overview</h2>
        <p className="text-white-50">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="row g-4 mb-5">
        {statCards.map((stat) => (
          <div key={stat.label} className="col-md-3">
            <div className="admin-card stat-card">
              <div className="icon" style={{ color: stat.color }}>{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="admin-card h-100">
            <h4 className="mb-4">Recent Activity</h4>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order._id}>
                      <td>#{order._id.slice(-6)}</td>
                      <td>{order.userId?.name || "Guest"}</td>
                      <td>₹{order.totalPrice}</td>
                      <td>
                        <span className={`badge ${order.status === 'Completed' ? 'bg-success' : 'bg-warning'} bg-opacity-10 text-${order.status === 'Completed' ? 'success' : 'warning'}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {recentOrders.length === 0 && (
                    <tr><td colSpan="4" className="text-center py-4 opacity-50">No recent orders found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="admin-card">
            <h4 className="mb-4">Quick Actions</h4>
            <div className="d-grid gap-3">
              <button className="admin-btn admin-btn-outline text-start" onClick={() => navigate('/admin/menu')}>➕ Add New Food Item</button>
              <button className="admin-btn admin-btn-outline text-start" onClick={() => navigate('/admin/orders')}>📦 View All Orders</button>
              <button className="admin-btn admin-btn-outline text-start" onClick={() => navigate('/admin/categories')}>🗂️ Manage Categories</button>
              <button className="admin-btn admin-btn-outline text-start" onClick={() => navigate('/admin/users')}>👥 Manage Users</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
