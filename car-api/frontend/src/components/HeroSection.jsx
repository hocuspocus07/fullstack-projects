import React from "react";

function HeroSection() {
  return (
    <section>
      <section className="h-screen w-screen flex flex-col justify-center items-start px-10 text-white">
        <span className="text-7xl text-[#FFD700]">VrooomAPI</span>
        <p className="mt-3 text-xl max-w-2xl">
          Revolutionize your driving experience with our cutting-edge car API
          solutions. Seamless integration, instant access—start developing right
          after signing up and unlock your API key today!
        </p>
      </section>
    </section>
  );
}

export default HeroSection;
