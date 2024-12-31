import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link,useLocation } from 'react-router-dom'; 

function NavBar() {
  const location = useLocation(); 
  const isLoggedIn = () => {
    return localStorage.getItem('authToken') !== null; 
  };
  return (
      <Navbar className="bg-black text-white w-full fixed top-0 left-0 h-16 text-lg z-10">
        <Container>
          <Navbar.Brand as={Link} to="/" className='text-white text-2xl'>Vrooom<span className='text-[#FFD700]'>API</span></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="hover:text-[#6200EA] text-white" >Home</Nav.Link>
            <Nav.Link as={Link} to="/docs" className="hover:text-[#6200EA] text-white">Documentation</Nav.Link>
            {!isLoggedIn() &&(<Nav.Link as={Link} to="/login" className="hover:text-[#6200EA] text-white">Login</Nav.Link>)}
            {isLoggedIn() && (location.pathname === "/docs"||location.pathname==="/") && (
            <Nav.Link as={Link} to="/dashboard" className="hover:text-[#6200EA] text-white">
              Back to Dashboard
            </Nav.Link>
          )}
          </Nav>
          {!isLoggedIn() &&(<Button href='/register' variant="primary">Sign up</Button>)}
        </Container>
      </Navbar>
  );
}

export default NavBar;