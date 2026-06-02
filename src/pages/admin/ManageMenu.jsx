import { useEffect, useState } from "react";
import api from "../../services/api";

const emptyFood = { name: "", image: "", price: "", rating: "", description: "", category: "" };

const ManageMenu = () => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyFood);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      const [{ data: foodData }, { data: catData }] = await Promise.all([
        api.get("/foods"),
        api.get("/categories")
      ]);
      setFoods(foodData || []);
      setCategories(catData || []);
    } catch (err) {
      console.error("Load error:", err);
      // alert("Could not fetch data from throne room.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category) return alert("Please select a Menu Card (Category)");
    setLoading(true);
    try {
      const payload = { ...form, price: Number(form.price), rating: Number(form.rating) };
      if (editingId) await api.put(`/foods/${editingId}`, payload);
      else await api.post("/foods", payload);
      
      alert(editingId ? "Food item revised successfully." : "New food item inducted.");
      setForm(emptyFood);
      setEditingId(null);
      setShowModal(false);
      loadData();
    } catch (err) {
      alert("Failed to save food item: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (food) => {
    setForm({ ...food, category: food.category?._id || food.category });
    setEditingId(food._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Banish this dish from the menu permanently?")) return;
    try {
      await api.delete(`/foods/${id}`);
      alert("Dish abolished.");
      loadData();
    } catch (err) {
      alert("Banishment failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2>Manage Menu Items</h2>
          <p className="text-white-50">Add, edit or remove items from your public menu.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => { setForm(emptyFood); setEditingId(null); setShowModal(true); }}>
          ➕ Add New Item
        </button>
      </div>

      <div className="admin-card p-0 overflow-hidden">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id}>
                  <td>
                    <img src={food.image} alt={food.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                  </td>
                  <td className="fw-bold">{food.name}</td>
                  <td>₹{food.price}</td>
                  <td>{categories.find(c => c._id === food.category)?.name || "Uncategorized"}</td>
                  <td className="text-end">
                    <button className="admin-btn admin-btn-outline btn-sm me-2" onClick={() => handleEdit(food)}>Edit</button>
                    <button className="admin-btn admin-btn-danger btn-sm" onClick={() => handleDelete(food._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3 className="mb-4">{editingId ? "Edit Food Item" : "Create New Item"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <label className="small text-white-50 mb-1">Food Name</label>
                  <input className="admin-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Royal Mutton Biryani" required />
                </div>
                <div className="col-md-12">
                  <label className="small text-white-50 mb-1">Menu Card (Category)</label>
                  <select className="admin-input" value={form.category} onChange={e => setForm({...form, category: e.target.value})} required>
                    <option value="">Select Category</option>
                    {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="small text-white-50 mb-1">Price (₹)</label>
                  <input className="admin-input" type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="450" required />
                </div>
                <div className="col-md-6">
                  <label className="small text-white-50 mb-1">Rating</label>
                  <input className="admin-input" type="number" step="0.1" max="5" value={form.rating} onChange={e => setForm({...form, rating: e.target.value})} placeholder="4.5" required />
                </div>
                <div className="col-12">
                  <label className="small text-white-50 mb-1">Image URL</label>
                  <input className="admin-input" value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="https://..." required />
                </div>
                <div className="col-12">
                  <label className="small text-white-50 mb-1">Description</label>
                  <textarea className="admin-input" rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Describe the flavors..." required />
                </div>
              </div>
              <div className="d-flex gap-3 mt-5">
                <button type="button" className="admin-btn admin-btn-outline flex-grow-1" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary flex-grow-1" disabled={loading}>
                  {loading ? "Saving..." : editingId ? "Update Item" : "Create Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMenu;
