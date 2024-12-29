import React from "react";
import NavBar from "../components/Navbar.jsx";
import HeroSection from "../components/HeroSection.jsx";
import Features from "../components/Features.jsx";

function HomePage() {
  return (
    <>
      <div className="bg-custom-bg bg-center bg-cover h-screen w-screen container m-0">
        <NavBar />
        <HeroSection />
      </div>
      <Features />
    </>
  );
}

export default HomePage;
