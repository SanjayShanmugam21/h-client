import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(form);
    if (!result.ok) return setError(result.message);
    navigate("/");
  };

  return (
    <div className="auth-wrap">
      <div className="reveal">
        <form className="auth-card shadow-lg" onSubmit={submitHandler}>
          <h3 className="mb-4">Welcome Back</h3>
          <p className="text-white-50 text-center mb-5 small">Enter your credentials to access the palace.</p>
          
          {error && <div className="alert alert-danger py-2 mb-4 small rounded-0">{error}</div>}
          
          <div className="mb-4">
            <input 
              className="form-control-custom" 
              type="email" 
              placeholder="Your Email" 
              onChange={(e) => setForm({ ...form, email: e.target.value })} 
              required 
            />
          </div>
          
          <div className="mb-5 position-relative">
            <input 
              className="form-control-custom" 
              type={showPassword ? "text" : "password"} 
              placeholder="Your Password" 
              onChange={(e) => setForm({ ...form, password: e.target.value })} 
              required 
            />
            <span 
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                opacity: 0.5
              }}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>
          
          <button className="order-btn w-100" disabled={loading}>
            {loading ? "Approving..." : "Step Inside"}
          </button>
          
          <p className="mt-5 mb-0 text-center small text-white-50">
            No account? <Link to="/register" className="text-secondary text-decoration-none fw-bold">Register as Guest</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
