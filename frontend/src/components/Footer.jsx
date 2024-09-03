// Footer.js
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">About Us</h2>
          <p className="text-gray-400">
            We are committed to transparency and anti-corruption efforts,
            providing a platform where complaints are tracked and managed
            efficiently.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/complaints" className="hover:text-white">
                Complaints
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-white">
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-gray-400">Email: support@complaintsystem.com</p>
          <p className="text-gray-400">Phone: +123 456 7890</p>
          <p className="text-gray-400">
            Address: 123 Transparency St., Integrity City
          </p>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} PraiseMedia. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
