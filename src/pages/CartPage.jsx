import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import api from "../services/api";

const CartPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const placeOrder = async () => {
    if (!isAuthenticated) return navigate("/login");
    try {
      setError("");
      await api.post("/orders", {
        items: cartItems.map((item) => ({ foodId: item._id, quantity: item.quantity })),
      });
      clearCart();
      setMessage("Order placed successfully.");
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Your Cart</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!cartItems.length ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr><th>Item</th><th>Price</th><th>Qty</th><th>Total</th><th /></tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>
                      <input
                        className="form-control"
                        style={{ width: "80px" }}
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                      />
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item._id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h5>Total: ${totalPrice.toFixed(2)}</h5>
          <button className="btn btn-warning mt-2" onClick={placeOrder}>Place Order</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
