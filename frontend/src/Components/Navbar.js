import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../Assets/StaticImages/logo.png';
import Logos from '../Assets/StaticImages/logos.png';
import '../Styles/ComponentStyles/Navbar.css';
import { Link } from 'react-router-dom';
function Navbars() {
  return (
   
          <Navbar expand="lg" className="bg-body-white">
            <Container>
              <Navbar.Brand href="/">
                <img src={Logos} alt="Logo" style={{ width: '150px', height: '120px' }} />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <div className='nav-right'>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <NavDropdown title="Account" id="basic-nav-dropdown">
                    <NavDropdown.Item><Link to='/login' className='nav-link'>Login</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link to='/registration' className='nav-link'>Registration</Link></NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
              </div>
            </Container>
          </Navbar>
      
  );
}

export default Navbars;
