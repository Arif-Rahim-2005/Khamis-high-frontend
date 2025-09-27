import { Link } from "react-router-dom";
import React from "react";

const Header = () => {
  return (
    <nav className="flex flex-row bg-green-700 text-white p-4 justify-between items-center">
      <div className="flex-1/3 flex flex-row gap-1.5">
        <div className="w-16 h-16 flex justify-center items-center">
          <img src="./Photos/image.png" alt="Khamis High badge" />
        </div>
        <div className="flex flex-col justify-center items-start text-3xl font-bold">
          <Link to="/">
            <h3>Home</h3>
          </Link>
        </div>
      </div>
      <div className="flex flex-row gap-12 text-2xl font-semibold">
        <div>
          <Link to="/academics">
            <p>Academics</p>
          </Link>
        </div>
        <div>
          <Link to="/about-us">
            <p>About us</p>
          </Link>
        </div>
        <div>
          <Link to="/contacts">
            <p>Contacts</p>
          </Link>
        </div>
        {/* <div>
            <p>more...</p>
          </div> */}
      </div>
    </nav>
  );
};
export default Header;
