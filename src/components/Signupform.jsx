import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // 👁️ toggle icons
import LoginModal from "./loginform"; // for switching modals

const API_URL = import.meta.env.VITE_API_URL;

const SignUpModal = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // 🧠 Submit with Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSignup(e);
  };

  // 🧩 Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("🎉 Account created successfully!");
        onClose();
      } else {
        alert(data.message || "Signup failed!");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("⚠️ Server error. Please check your connection or backend.");
    } finally {
      setLoading(false);
    }
  };

  // 🧩 If user wants to log in instead
  if (showLogin) {
    return <LoginModal onClose={() => setShowLogin(false)} />;
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
          Create an Account
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSignup}>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none text-black"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="example@gmail.com"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none text-black"
              required
            />
          </div>

          {/* Password + Eye Toggle */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:ring-2 focus:ring-green-600 outline-none text-black"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-8 right-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition-all ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {/* Switch to Login */}
          <p className="text-sm text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <button
              type="button"
              className="text-green-700 hover:underline"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
