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
          <div className="logo-icon">
            <svg width="35" height="35" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="25" cy="25" r="23" stroke="currentColor" strokeWidth="2" />
              <path d="M18 15V35M32 15V35M18 25H32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <path d="M15 15H21M29 15H35M15 35H21M29 35H35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="logo-text">
            <span className="brand-name">HOTEL HAYAATH</span>
            <span className="brand-subtitle">THE ROYAL EXPERIENCE</span>
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