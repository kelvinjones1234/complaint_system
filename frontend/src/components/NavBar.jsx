import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);

  const toggleMenu = () => setIsOpen(!isOpen);

  //   const handleLoginLogout = () => {
  //     setIsLoggedIn(!isLoggedIn);
  //     // Handle actual login/logout logic here
  //   };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-semibold">
          <Link to="/home-page" className="hover:text-gray-300">
            ActuCs
          </Link>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/home-page" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link to="/complaints" className="text-gray-300 hover:text-white">
            Make Complaint
          </Link>
          <Link to="/profile" className="text-gray-300 hover:text-white">
            Profile
          </Link>
          <Link to={"/login"} onClick={user && logoutUser}>
            <div className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition duration-300 w-full text-center">
              {user ? "Logout" : "Athentication"}
            </div>
          </Link>
        </div>
        <button
          onClick={toggleMenu}
          className="text-gray-300 md:hidden"
          aria-label="Toggle navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} mt-4`}>
        <div className="flex flex-col items-center space-y-4">
          <Link to="/home-page" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link to="/complaints" className="text-gray-300 hover:text-white">
            Make Complaint
          </Link>
          <Link to="/profile" className="text-gray-300 hover:text-white">
            Profile
          </Link>
          <Link to={"/login"} onClick={user && logoutUser}>
            <div className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition duration-300 w-full text-center">
              {user ? "Logout" : "Authentication"}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
