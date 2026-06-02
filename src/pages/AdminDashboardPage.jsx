import { useEffect, useState } from "react";
import api from "../services/api";

const emptyFood = { name: "", image: "", price: "", rating: "", description: "" };

const AdminDashboardPage = () => {
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [foodForm, setFoodForm] = useState(emptyFood);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const [foodsRes, ordersRes] = await Promise.all([api.get("/foods"), api.get("/orders")]);
      setFoods(foodsRes.data);
      setOrders(ordersRes.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load admin data.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const saveFood = async (e) => {
    e.preventDefault();
    try {
      if (editingId) await api.put(`/foods/${editingId}`, foodForm);
      else await api.post("/foods", foodForm);
      setFoodForm(emptyFood);
      setEditingId(null);
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save food.");
    }
  };

  const removeFood = async (id) => {
    try {
      await api.delete(`/foods/${id}`);
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete food.");
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}`, { status });
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update order.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Admin Dashboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card mb-4 p-3">
        <h5>{editingId ? "Edit Food Item" : "Add Food Item"}</h5>
        <form className="row g-2" onSubmit={saveFood}>
          {Object.keys(emptyFood).map((field) => (
            <div className="col-md-6" key={field}>
              <input
                className="form-control"
                placeholder={field}
                value={foodForm[field]}
                onChange={(e) => setFoodForm({ ...foodForm, [field]: e.target.value })}
                required
              />
            </div>
          ))}
          <div className="col-12">
            <button className="btn btn-warning btn-sm me-2" type="submit">Save</button>
            <button className="btn btn-outline-secondary btn-sm" type="button" onClick={() => { setFoodForm(emptyFood); setEditingId(null); }}>
              Cancel
            </button>
          </div>
        </form>
      </div>

      <h5>Food Items</h5>
      <div className="table-responsive mb-4">
        <table className="table">
          <thead><tr><th>Name</th><th>Price</th><th>Rating</th><th /></tr></thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id}>
                <td>{food.name}</td>
                <td>${food.price}</td>
                <td>{food.rating}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => { setFoodForm(food); setEditingId(food._id); }}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => removeFood(food._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h5>All Orders</h5>
      {orders.map((order) => (
        <div className="card mb-3" key={order._id}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{order.userId?.name || "Unknown user"}</strong> ({order.userId?.email})
                <p className="mb-1">Total: ${order.totalPrice.toFixed(2)}</p>
              </div>
              <select
                className="form-select"
                style={{ maxWidth: "180px" }}
                value={order.status}
                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboardPage;
