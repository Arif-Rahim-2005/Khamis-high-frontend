import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { User } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <nav className="flex justify-between items-center px-6 md:px-16 py-4 bg-green-700 text-white shadow-md relative">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          src="./Photos/image.png"
          alt="Khamis High badge"
          className="w-12 h-12"
        />
        <Link
          to="/"
          className="text-xl md:text-2xl font-semibold tracking-wide"
        >
          Home
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 text-lg font-light items-center">
        <Link to="/academics" className="hover:underline">
          Academics
        </Link>
        <Link to="/about-us" className="hover:underline">
          About Us
        </Link>
        <Link to="/contacts" className="hover:underline">
          Contacts
        </Link>
        <Link to="/clubs" className="hover:underline">
          Clubs and Societies
        </Link>

        {/* Profile Icon */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="ml-2 hover:scale-110 transition-transform duration-300 focus:outline-none"
          >
            <User className="w-6 h-6 text-white hover:text-yellow-300 transition-colors duration-300" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg z-50 w-40">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => alert("Open login form")}
              >
                Login
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => alert("Open signup form")}
              >
                Signup
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Button */}
      <div className="flex col-start-2 justify-between items-center gap-2">
        {/* Profile Icon */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="ml-2 hover:scale-110 transition-transform duration-300 focus:outline-none"
          >
            <User className="w-10 h-10 text-white hover:text-yellow-300 transition-colors duration-300 pt-2"  />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg z-50 w-40">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => alert("Open login form")}
              >
                Login
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => alert("Open signup form")}
              >
                Signup
              </button>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute right-0 top-full  bg-green-700 border-t border-white shadow-lg z-50">
          <Link
            to="/academics"
            className="block px-6 py-3 hover:bg-green-600 border-b border-white"
          >
            Academics
          </Link>
          <Link
            to="/about-us"
            className="block px-6 py-3 hover:bg-green-600 border-b border-white"
          >
            About Us
          </Link>
          <Link
            to="/contacts"
            className="block px-6 py-3 hover:bg-green-600 border-b border-white"
          >
            Contacts
          </Link>
          <Link to="/clubs" className="block px-6 py-3 hover:bg-green-600">
            Clubs and Societies
          </Link>
        </div>
      )}
    </nav>
  );
};
export default Header;
