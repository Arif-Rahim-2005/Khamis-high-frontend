import React from "react";

const LoginModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Modal box */}
      <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-md p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6 text-green-700">
          Login to Khamis High
        </h2>

        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none"
              placeholder="example@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none"
              placeholder="••••••••"
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-green-700 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <button className="text-green-700 hover:underline">Sign up</button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
