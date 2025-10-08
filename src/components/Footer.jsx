import { Link } from "react-router-dom";
import React from "react";

const Footer = () => { 

    return (
      <footer className="bg-green-900 text-gray-200 py-10 mt-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div>
            <h4 className="text-xl font-semibold mb-3">Khamis High School</h4>
            <p className="text-sm text-gray-400">
              Committed to academic excellence, discipline, and holistic student
              growth.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/academics" className="hover:underline">
                  Academics
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="hover:underline">
                  Contacts
                </Link>
              </li>
              <li>
                <Link to="/clubs" className="hover:underline">
                  Clubs and Societies
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-3">Contact</h4>
            <p className="text-sm">📍 Khamis, Mombasa</p>
            <p className="text-sm">📧 info@khamishigh.ac.ke</p>
            <p className="text-sm">📞 +254 7XX XXX XXX</p>
          </div>
        </div>
        <p className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} Khamis High School. All rights reserved.
        </p>
      </footer>
    );
}
export default Footer;