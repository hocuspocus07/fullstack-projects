import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';

function NavBar() {
  const location = useLocation();

  // Check if the user is logged in
  const isLoggedIn = () => {
    return localStorage.getItem('authToken') !== null;
  };

  return (
    <Navbar className="bg-black text-white w-full fixed top-0 left-0 h-16 text-lg z-10" expand="lg">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/" className="text-white text-2xl">
          Vrooom<span className="text-[#FFD700]">API</span>
        </Navbar.Brand>

        {/* Navbar Toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-[#6200EA]" />

        {/* Navbar Collapse */}
        <Navbar.Collapse className='xs:bg-gray-800' id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="hover:text-[#6200EA] text-white">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/docs" className="hover:text-[#6200EA] text-white">
              Documentation
            </Nav.Link>

            {!isLoggedIn() && (
              <Nav.Link as={Link} to="/login" className="hover:text-[#6200EA] text-white">
                Login
              </Nav.Link>
            )}

            <Nav.Link as={Link} to="/contact" className="hover:text-[#6200EA] text-white">
              Contact Us
            </Nav.Link>

            {isLoggedIn() && (location.pathname === '/docs' || location.pathname === '/') && (
              <Nav.Link as={Link} to="/dashboard" className="hover:text-[#6200EA] text-white">
                Back to Dashboard
              </Nav.Link>
            )}
          </Nav>

          {!isLoggedIn() && (
            <Button href="/register" variant="primary">
              Sign up
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
