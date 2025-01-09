import React from "react";
import NavBar from "../components/NavBar.jsx";
import HeroSection from "../components/HeroSection.jsx";
import Features from "../components/Features.jsx";
import About from "../components/About.jsx";
import AboutDev from "../components/AboutDev.jsx";

function HomePage() {
  return (
    <>
      <div className="h-screen w-screen">
        <div className="bg-custom-bg bg-center bg-cover m-0 transition-all duration-500 ease-in-out">
          <NavBar />
          <HeroSection />
        </div>
        <Features />
        <div className="relative">
          <div className="absolute inset-0 bg-custom-about-bg bg-center bg-cover brightness-50 z-0"></div>
          <div className="relative z-10">
            <About />
            <AboutDev />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
