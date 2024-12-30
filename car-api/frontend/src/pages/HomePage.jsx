import React from "react";
import NavBar from "../components/Navbar.jsx";
import HeroSection from "../components/HeroSection.jsx";
import Features from "../components/Features.jsx";

function HomePage() {
  return (
    <>
    <div className="h-screen w-screen">
      <div className="bg-custom-bg bg-center bg-cover m-0" style={{backgroundImage:"/assets/bg.jpg",backgroundPosition:"center",backgroundSize:"cover",}}>
        <NavBar />
        <HeroSection />
      </div>
      <Features />
      </div>
    </>
  );
}

export default HomePage;
