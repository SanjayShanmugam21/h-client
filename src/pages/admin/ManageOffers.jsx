import { useState } from "react";

const ManageOffers = () => {
  const [offers, setOffers] = useState([
    { id: 1, title: "Weekly Biryani Bonanza", discount: "20% OFF", status: "Active", expiry: "2026-04-20" },
    { id: 2, title: "Weekend Family Pack", discount: "₹200 OFF", status: "Inactive", expiry: "2026-04-25" },
  ]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2>Manage Offers & Deals</h2>
          <p className="text-white-50">Create and monitor seasonal discounts for your customers.</p>
        </div>
        <button className="admin-btn admin-btn-primary">➕ Create New Offer</button>
      </div>

      <div className="row g-4">
        {offers.map(offer => (
          <div key={offer.id} className="col-md-6">
            <div className="admin-card">
              <div className="d-flex justify-content-between mb-4">
                <span className={`badge ${offer.status === 'Active' ? 'bg-success' : 'bg-secondary'} bg-opacity-25 text-${offer.status === 'Active' ? 'success' : 'white'}`}>
                  {offer.status}
                </span>
                <span className="text-white-50 small">Expires: {offer.expiry}</span>
              </div>
              <h3 className="mb-2 text-secondary">{offer.title}</h3>
              <p className="display-6 fw-bold mb-4">{offer.discount}</p>
              <div className="d-flex gap-2">
                <button className="admin-btn admin-btn-outline btn-sm flex-grow-1">Edit</button>
                <button className="admin-btn admin-btn-danger btn-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageOffers;
