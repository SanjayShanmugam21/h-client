import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import OrdersPage from "./pages/OrdersPage";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

// Admin Imports
import AdminLayout from "./components/layout/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import ManageCategories from "./pages/admin/ManageCategories";
import ManageMenu from "./pages/admin/ManageMenu";
import ManageMenuCards from "./pages/admin/ManageMenuCards";
import ManageOffers from "./pages/admin/ManageOffers";
import ManagePosters from "./pages/admin/ManagePosters";
import UserManagement from "./pages/admin/UserManagement";
import OrderManagement from "./pages/admin/OrderManagement";

const Placeholder = ({ title }) => (
  <div className="container py-5">
    <h2 className="text-white">{title}</h2>
    <p className="text-white-50">Content for this section is currently being prepared for the royal experience.</p>
  </div>
);

const App = () => (
  <div className="d-flex flex-column min-vh-100">
    <Routes>
      {/* Admin Dashboard Routes (Separate Layout, No Public Navbar/Footer) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="categories" element={<ManageCategories />} />
        <Route path="menu" element={<ManageMenu />} />
        <Route path="menu-cards" element={<ManageMenuCards />} />
        <Route path="offers" element={<ManageOffers />} />
        <Route path="posters" element={<ManagePosters />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="orders" element={<OrderManagement />} />
      </Route>

      {/* Public Routes with Main Navbar/Footer */}
      <Route
        path="/*"
        element={
          <>
            <Navbar />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <OrdersPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </>
        }
      />
    </Routes>
  </div>
);

export default App;
