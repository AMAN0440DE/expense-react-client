import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register({ setUser }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5001/auth/register",
        formData,
        { withCredentials: true }
      );

      // 🔥 auto-login
      setUser(response.data.user);
      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container">
      <h3>Create Account</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            className="form-control"
            name="name"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            className="form-control"
            name="email"
            type="email"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            className="form-control"
            name="password"
            type="password"
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary mt-3">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
