import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-screen h-10 bg-black text-gray-300 text-center py-4">
      <p className="text-sm">
        &copy; {currentYear} VrooomAPI. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
