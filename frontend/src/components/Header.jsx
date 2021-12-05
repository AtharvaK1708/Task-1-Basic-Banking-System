import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

const Header = () => {
  const activeStyle = { color: '#fff' };

  return (
    <header>
      <Navbar
        bg="dark"
        expand="lg"
        variant="dark"
        style={{ height: '90px' }}
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand>
            <img
              style={{ width: '20rem' }}
              src="/images/final_logo.png"
              alt="main-logo"
            />
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav className="">
              <Nav.Link
                style={window.location.pathname === '/' ? activeStyle : {}}
                href="/"
              >
                Home
              </Nav.Link>
              <Nav.Link
                style={
                  window.location.pathname === '/customers' ? activeStyle : {}
                }
                href="/customers"
              >
                Customers
              </Nav.Link>
              <Nav.Link
                style={
                  window.location.pathname === '/transactions'
                    ? activeStyle
                    : {}
                }
                href="/transactions"
              >
                Transactions
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
