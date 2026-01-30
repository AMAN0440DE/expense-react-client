import { useState } from "react";

export default function LoginPage({ onBackClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
    // Add your login logic here
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="card shadow" style={{ width: "100%", maxWidth: "400px" }}>
        {/* Back Button */}
        {onBackClick && (
          <div className="card-header bg-white border-bottom p-3">
            <button 
              className="btn btn-link text-decoration-none p-0" 
              onClick={onBackClick}
            >
              ← Back to Home
            </button>
          </div>
        )}

        <div className="card-body p-5">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="card-title mb-2">Welcome Back</h1>
            <p className="text-muted">Sign in to your Expense App account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email Address
              </label>
              <input
                type="email"
                className="form-control form-control-lg"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>
              <div className="input-group input-group-lg">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-decoration-none">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 mb-3"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="d-flex align-items-center my-4">
            <div className="flex-grow-1 border-top"></div>
            <span className="mx-2 text-muted">OR</span>
            <div className="flex-grow-1 border-top"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="d-grid gap-2">
            <button className="btn btn-outline-secondary btn-lg">
              <i className="bi bi-google"></i> Sign in with Google
            </button>
            <button className="btn btn-outline-secondary btn-lg">
              <i className="bi bi-facebook"></i> Sign in with Facebook
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <p className="text-muted">
              Don't have an account?{" "}
              <a href="#" className="text-decoration-none fw-semibold">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
