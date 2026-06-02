import { useEffect, useState } from "react";
import api from "../../services/api";

const emptyCard = { title: "", image: "", description: "", isActive: true };

const ManageMenuCards = () => {
    const [cards, setCards] = useState([]);
    const [form, setForm] = useState(emptyCard);
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadData = async () => {
        try {
            const { data } = await api.get("/menu-cards");
            setCards(data || []);
        } catch (err) {
            console.error("Load error:", err);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("isActive", form.isActive);
        if (file) {
            formData.append("image", file);
        } else {
            formData.append("image", form.image);
        }

        try {
            const config = {
                headers: { "Content-Type": "multipart/form-data" },
            };

            if (editingId) await api.put(`/menu-cards/${editingId}`, formData, config);
            else await api.post("/menu-cards", formData, config);

            alert(editingId ? "Menu card updated." : "Menu card uploaded successfully.");
            setForm(emptyCard);
            setFile(null);
            setEditingId(null);
            setShowModal(false);
            loadData();
        } catch (err) {
            alert("Failed to save menu card: " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (card) => {
        setForm(card);
        setFile(null);
        setEditingId(card._id);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this menu card?")) return;
        try {
            await api.delete(`/menu-cards/${id}`);
            alert("Menu card deleted.");
            loadData();
        } catch (err) {
            alert("Deletion failed: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h2>Manage Menu Cards</h2>
                    <p className="text-white-50">Upload and manage physical menu card images for the slider.</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={() => { setForm(emptyCard); setEditingId(null); setShowModal(true); }}>
                    ➕ Upload New Card
                </button>
            </div>

            <div className="admin-card p-0 overflow-hidden">
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cards.map((card) => (
                                <tr key={card._id}>
                                    <td>
                                        <img src={card.image} alt={card.title} style={{ width: '60px', height: '80px', borderRadius: '4px', objectFit: 'cover' }} />
                                    </td>
                                    <td className="fw-bold">{card.title}</td>
                                    <td>
                                        <span className={`badge ${card.isActive ? 'bg-success' : 'bg-secondary'}`}>
                                            {card.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="text-end">
                                        <button className="admin-btn admin-btn-outline btn-sm me-2" onClick={() => handleEdit(card)}>Edit</button>
                                        <button className="admin-btn admin-btn-danger btn-sm" onClick={() => handleDelete(card._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {cards.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-5 text-white-50">No menu cards found. Upload your first one!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <h3 className="mb-4">{editingId ? "Edit Menu Card" : "Upload Menu Card"}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="small text-white-50 mb-1">Card Title</label>
                                    <input className="admin-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Main Course Page 1" required />
                                </div>
                                <div className="col-12">
                                    <label className="small text-white-50 mb-1">Menu Card Image</label>
                                    <input
                                        type="file"
                                        className="admin-input"
                                        onChange={e => setFile(e.target.files[0])}
                                        accept="image/*"
                                        required={!editingId && !form.image}
                                    />
                                    <div className="small text-white-50 mt-1">
                                        {form.image ? "Current: " + form.image.split('/').pop() : "Upload a high-quality image of the menu page."}
                                    </div>
                                    <div className="mt-2">
                                        <label className="small text-white-50 mb-1">Or Image URL</label>
                                        <input
                                            className="admin-input"
                                            value={form.image}
                                            onChange={e => setForm({ ...form, image: e.target.value })}
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="small text-white-50 mb-1">Description (Optional)</label>
                                    <textarea className="admin-input" rows="2" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Brief details about this card..." />
                                </div>
                                <div className="col-12">
                                    <div className="form-check form-switch mt-2">
                                        <input className="form-check-input" type="checkbox" id="isActive" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} />
                                        <label className="form-check-label text-white-50" htmlFor="isActive">Active (Display in Slider)</label>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex gap-3 mt-5">
                                <button type="button" className="admin-btn admin-btn-outline flex-grow-1" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="admin-btn admin-btn-primary flex-grow-1" disabled={loading}>
                                    {loading ? "Saving..." : editingId ? "Update Card" : "Upload Card"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMenuCards;
