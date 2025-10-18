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
                <Link to="/fee" className="hover:underline">
                  Fee Structure
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
            <button
              className="text-sm"
              onClick={() => {
                window.open(
                  "https://www.google.com/maps/place/Khamis+High+School/@-4.0367878,39.6655004,21z/data=!4m14!1m7!3m6!1s0x184012bb606b45f9:0x7005df7c181e532c!2sKhamis+High+School!8m2!3d-4.0366647!4d39.6656861!16s%2Fg%2F1pyqsnm54!3m5!1s0x184012bb606b45f9:0x7005df7c181e532c!8m2!3d-4.0366647!4d39.6656861!16s%2Fg%2F1pyqsnm54?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
                );
              }}
            >
              📍 Khamis, Mombasa
            </button>
            <p className="text-sm">📧 Khamishigh@yahoo.com</p>
            <p className="text-sm">📞 +254 0203590180</p>
          </div>
        </div>
        <p className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} Khamis High School. All rights reserved.
        </p>
      </footer>
    );
}
export default Footer;