import { useEffect, useState } from "react";
import api from "../../services/api";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { _id: '1', name: 'Sultan Ahmed', email: 'sultan@regal.com', role: 'user', status: 'Active' },
    { _id: '2', name: 'Zoya Khan', email: 'zoya@hyathh.in', role: 'admin', status: 'Active' },
    { _id: '3', name: 'Fatima J.', email: 'fatima@guest.com', role: 'user', status: 'Blocked' },
  ]);

  return (
    <div>
      <div className="mb-5">
        <h2>User Management</h2>
        <p className="text-white-50">Control user access and manage account roles.</p>
      </div>

      <div className="admin-card p-0 overflow-hidden">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User Details</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="fw-bold">{user.name}</div>
                    <div className="small text-white-50">{user.email}</div>
                  </td>
                  <td>
                    <span className={`badge ${user.role === 'admin' ? 'bg-secondary' : 'bg-dark'} border border-secondary border-opacity-25`}>
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <span className={`text-${user.status === 'Active' ? 'success' : 'danger'}`}>
                      ● {user.status}
                    </span>
                  </td>
                  <td className="text-end">
                    <button className="admin-btn admin-btn-outline btn-sm me-2">
                      {user.status === 'Active' ? 'Block' : 'Unblock'}
                    </button>
                    <button className="admin-btn admin-btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
