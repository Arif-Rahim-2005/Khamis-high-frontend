import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // 👀 for the password toggle icons
import SignUpModal from "./Signupform";

const API_URL = import.meta.env.VITE_API_URL;

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // 🧠 Handle pressing Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  // 🔐 Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user)); // if you store the user

        alert("✅ Logged in successfully!");
        onClose();

        // 🔄 Reload the page
        window.location.reload();
      } else {
        alert(data.message || "Login failed!");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🧩 Conditional render: show signup if toggled
  if (showSignup) {
    return <SignUpModal onClose={() => setShowSignup(false)} />;
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-md p-8 relative">
        {/* ❌ Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6 text-green-700">
          Login to Khamis High
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none text-black"
              placeholder="example@gmail.com"
            />
          </div>

          {/* Password Input with Eye Toggle */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:ring-2 focus:ring-green-600 outline-none text-black"
              placeholder="••••••••"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-8 right-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-green-700 hover:underline"
              onClick={() => alert("Forgot password feature coming soon!")}
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition-all disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <button
            className="text-green-700 hover:underline"
            onClick={() => setShowSignup(true)}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
