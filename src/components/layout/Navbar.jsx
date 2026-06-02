import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";

const CustomNavbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { cartItems } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`custom-navbar ${scrolled ? "scrolled" : ""}`}
      variant="dark"
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="royal-logo">
          <div className="logo-icon">H</div>
          <div className="logo-text">
            <span className="brand-name">HAYAATH</span>
            <span className="brand-subtitle">HOTEL ROYAL</span>
          </div>
        </Navbar.Brand>


        <Navbar.Toggle aria-controls="royal-navbar-nav" />

        <Navbar.Collapse id="royal-navbar-nav">
          {/* Menu Links */}
          <Nav className="mx-auto nav-links-container">
            <Nav.Link as={NavLink} to="/" end className="px-3">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/menu" className="px-3">Menu</Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="px-3">About</Nav.Link>
            <Nav.Link as={NavLink} to="/contact" className="px-3">Contact</Nav.Link>
            {isAdmin && (
              <Nav.Link as={NavLink} to="/admin" className="px-3 text-secondary fw-bold">
                Admin Panel
              </Nav.Link>
            )}
          </Nav>

          {/* Actions */}
          <Nav className="nav-actions-container align-items-center gap-3">
            {isAuthenticated ? (
              <NavDropdown
                title={user?.name.split(' ')[0]}
                id="user-dropdown"
                align="end"
                className="user-dropdown-custom"
              >
                <NavDropdown.Item as={Link} to="/orders">My Orders</NavDropdown.Item>
                {isAdmin && <NavDropdown.Item as={Link} to="/admin">Admin Dashboard</NavDropdown.Item>}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout} className="text-secondary">Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="d-flex gap-3 align-items-center">
                <Link to="/login" className="login-btn text-decoration-none">Login</Link>
                <Link to="/register" className="register-btn text-decoration-none">Connect</Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;