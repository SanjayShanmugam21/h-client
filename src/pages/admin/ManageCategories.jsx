import { useEffect, useState } from "react";
import api from "../../services/api";

const emptyCategory = { name: "", image: "", description: "" };

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyCategory);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadCategories = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) await api.put(`/categories/${editingId}`, form);
      else await api.post("/categories", form);
      
      alert(editingId ? "Menu Card updated." : "New Menu Card unveiled.");
      setForm(emptyCategory);
      setEditingId(null);
      setShowModal(false);
      loadCategories();
    } catch (err) {
      alert("Failed to save Menu Card: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Abolish this Menu Card? This won't delete the food items inside, but they will be 'Uncategorized'.")) return;
    try {
      await api.delete(`/categories/${id}`);
      alert("Card abolished.");
      loadCategories();
    } catch (err) {
      alert("Abolition failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2>Manage Menu Cards (Categories)</h2>
          <p className="text-white-50">Create the entry points for your menu collections.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => { setForm(emptyCategory); setEditingId(null); setShowModal(true); }}>
          ➕ Add New Menu Card
        </button>
      </div>

      <div className="row g-4">
        {categories.map((cat) => (
          <div className="col-md-6 col-lg-4" key={cat._id}>
            <div className="admin-card">
              <div className="rounded-4 overflow-hidden mb-3" style={{ height: '180px' }}>
                <img src={cat.image} className="w-100 h-100 object-fit-cover" alt={cat.name} />
              </div>
              <h4 className="text-secondary">{cat.name}</h4>
              <p className="small text-white-50 mb-4">{cat.description}</p>
              <div className="d-flex gap-2">
                <button className="admin-btn admin-btn-outline btn-sm flex-grow-1" onClick={() => { setForm(cat); setEditingId(cat._id); setShowModal(true); }}>Edit</button>
                <button className="admin-btn admin-btn-danger btn-sm" onClick={() => handleDelete(cat._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
        {categories.length === 0 && <p className="text-center w-100 opacity-50 py-5">No menu cards created yet.</p>}
      </div>

      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3 className="mb-4">{editingId ? "Edit Menu Card" : "New Menu Card"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <label className="small text-white-50 mb-1">Card Title (Category Name)</label>
                  <input className="admin-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Biryani Specials" required />
                </div>
                <div className="col-12">
                  <label className="small text-white-50 mb-1">Cover Image URL</label>
                  <input className="admin-input" value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="https://..." required />
                </div>
                <div className="col-12">
                  <label className="small text-white-50 mb-1">Short Description</label>
                  <textarea className="admin-input" rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Describe this collection..." required />
                </div>
              </div>
              <div className="d-flex gap-3 mt-5">
                <button type="button" className="admin-btn admin-btn-outline flex-grow-1" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary flex-grow-1" disabled={loading}>
                  {loading ? "Saving..." : "Save Card"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
