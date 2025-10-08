import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    // <nav className="flex flex-row bg-green-700 text-white p-4 justify-between items-center">
    //   <div className="flex-1/3 flex flex-row gap-1.5">
    //     <div className="w-16 h-16 flex justify-center items-center">
    //       <img src="./Photos/image.png" alt="Khamis High badge" />
    //     </div>

    //   </div>
    //   <button className="md:hidden m-1.5" onClick={() => setIsOpen(!isOpen)}>
    //     ☰
    //   </button>
    //   <div className="hidden md:flex flex-row gap-12 text-2xl font-semibold">
    //     <div>
    //       <Link to="/academics">
    //         <p>Academics</p>
    //       </Link>
    //     </div>
    //     <div>
    //       <Link to="/about-us">
    //         <p>About us</p>
    //       </Link>
    //     </div>
    //     <div>
    //       <Link to="/contacts">
    //         <p>Contacts</p>
    //       </Link>
    //     </div>
    //     <div>
    //       <Link to="/clubs">
    //         <p>CLubs and Societies</p>
    //       </Link>
    //     </div>
    //     {/* <div>
    //         <p>more...</p>
    //       </div> */}
    //   </div>

    // </nav>
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
          Clubs
        </Link>
      </div>

      {/* Mobile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-3xl focus:outline-none"
      >
        ☰
      </button>

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
