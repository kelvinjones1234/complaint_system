import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Profile from "../components/Profile";
import backgroundImage from "../assets/img/anti_corruption.jpeg";

const ProfilePage = () => {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }}>
      <NavBar />
      <Profile />
      <Footer />
    </div>
  );
};

export default ProfilePage;
