import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Login from "../components/Login";
import backgroundImage from "../assets/img/anti_corruption.jpeg";

const LoginPage = () => {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }}>
      <NavBar />
      <Login />
      <Footer />
    </div>
  );
};

export default LoginPage;
