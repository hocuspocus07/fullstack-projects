import React from 'react';

function AboutDev() {
  return (
    <div className="w-full h-60 text-white p-8 flex flex-col items-center z-999">
      <p className="text-xl mb-6 animate-float">This website was made with <span className="font-semibold text-[#FFD700]"><ion-icon name="heart-outline"></ion-icon></span> by <span className="font-semibold text-[#FFD700]">Sajjad</span></p>

      <div className="flex space-x-6 text-xl">
        <a
          href="https://www.github.com/hocuspocus07"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-[#FFD700] hover:scale-125 transition duration-300"
        >
          <ion-icon name="logo-github" size="large"></ion-icon>
        </a>
        <a
          href="https://www.linkedin.com/in/sajjadhasnain"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-[#FFD700] transition  hover:scale-125 duration-300"
        >
          <ion-icon name="logo-linkedin" size="large"></ion-icon>
        </a>
      </div>
    </div>
  );
}

export default AboutDev;
