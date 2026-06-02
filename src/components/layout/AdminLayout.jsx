import { Navigate, Outlet, useLocation, Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../admin.css";

const AdminLayout = () => {
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const NavItems = [
    { name: "Overview", path: "/admin", icon: "📊" },
    { name: "Manage Categories", path: "/admin/categories", icon: "🗂️" },
    { name: "Manage Menu", path: "/admin/menu", icon: "🍔" },
    { name: "Menu Cards", path: "/admin/menu-cards", icon: "📋" },
    { name: "Manage Offers", path: "/admin/offers", icon: "🏷️" },
    { name: "Upload Posters", path: "/admin/posters", icon: "🖼️" },
    { name: "User Management", path: "/admin/users", icon: "👥" },
    { name: "Orders", path: "/admin/orders", icon: "🛒" },
  ];

  return (
    <div className="admin-body">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          Hotel<span style={{ color: "#fff" }}>Hayaath</span>
          <div style={{ fontSize: "0.7rem", textTransform: "uppercase", opacity: 0.5 }}>Admin Portal</div>
        </div>

        <nav className="admin-nav">
          {NavItems.map((item) => (
            <div key={item.path} className="admin-nav-item">
              <NavLink
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`}
              >
                <span>{item.icon}</span> {item.name}
              </NavLink>
            </div>
          ))}
        </nav>

        <div className="admin-footer mt-auto pt-4">
          <button onClick={logout} className="admin-nav-link w-100 border-0 bg-transparent text-danger">
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main-wrap">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-profile">
            <div className="text-end">
              <div style={{ fontSize: "0.9rem", fontWeight: "600" }}>{user?.name || "Admin"}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--admin-text-muted)" }}>Administrator</div>
            </div>
            <div className="admin-avatar">
              {user?.name?.[0] || "A"}
            </div>
          </div>
        </header>

        {/* Content Page */}
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
