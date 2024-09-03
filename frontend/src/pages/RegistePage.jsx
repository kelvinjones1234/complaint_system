import React from "react";
import NavBar from "../components/NavBar";
import Register from "../components/Register";
import Footer from "../components/Footer";
import backgroundImage from "../assets/img/anti_corruption.jpeg";

const RegistePage = () => {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }}>
      <NavBar />
      <Register />
      <Footer />
    </div>
  );
};

export default RegistePage;
