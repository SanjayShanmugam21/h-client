import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    const result = await register(form);
    if (!result.ok) return setError(result.message);
    navigate("/");
  };

  return (
    <div className="auth-wrap">
      <div className="reveal">
        <form className="auth-card shadow-lg" onSubmit={submitHandler}>
          <h3 className="mb-4">Become a Guest</h3>
          <p className="text-white-50 text-center mb-5 small">Join the Hayaath legacy for exclusive offers.</p>
          
          {error && <div className="alert alert-danger py-2 mb-4 small rounded-0">{error}</div>}
          
          <div className="mb-4">
            <input 
              className="form-control-custom" 
              placeholder="Full Name" 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
              required 
            />
          </div>

          <div className="mb-4">
            <input 
              className="form-control-custom" 
              type="email" 
              placeholder="Email Address" 
              onChange={(e) => setForm({ ...form, email: e.target.value })} 
              required 
            />
          </div>
          
          <div className="mb-5 position-relative">
            <input 
              className="form-control-custom" 
              type={showPassword ? "text" : "password"} 
              placeholder="Create Password" 
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
            {loading ? "Preparing your stay..." : "Join the Palace"}
          </button>
          
          <p className="mt-5 mb-0 text-center small text-white-50">
            Already registered? <Link to="/login" className="text-secondary text-decoration-none fw-bold">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
