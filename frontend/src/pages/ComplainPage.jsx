import React from "react";
import NavBar from "../components/NavBar";
import ComplaintForm from "../components/Complaint";
import Footer from "../components/Footer";
import backgroundImage from "../assets/img/anti_corruption.jpeg";

const ComplainPage = () => {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }}>
      <NavBar />
      <ComplaintForm />
      <Footer />
    </div>
  );
};

export default ComplainPage;
