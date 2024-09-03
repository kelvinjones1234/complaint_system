import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Home from "../components/Home";
import backgroundImage from "../assets/img/anti_corruption.jpeg";

const HomePage = () => {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }}>
      <NavBar />
      <Home />
      <Footer />
    </div>
  );
};

export default HomePage;
