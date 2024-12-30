import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function NavBar() {
  return (
      <Navbar className="bg-black text-white w-full fixed top-0 left-0 h-16 text-lg z-10">
        <Container>
          <Navbar.Brand href="#home" className='text-white text-2xl'>Vrooom<span className='text-[#FFD700]'>API</span></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home" className="hover:text-[#6200EA] text-white" >Home</Nav.Link>
            <Nav.Link href="#features" className="hover:text-[#6200EA] text-white">Documentation</Nav.Link>
            <Nav.Link href="#pricing" className="hover:text-[#6200EA] text-white">Login</Nav.Link>
          </Nav>
          <Button variant="primary">Sign up</Button>
        </Container>
      </Navbar>
  );
}

export default NavBar;