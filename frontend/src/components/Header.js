import React from "react";
import {Navbar, Nav, Container} from "react-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar variant="dark" bg="dark" collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand href="/">ProShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/cart">Cart <i className="fas fa-shopping-cart"/></Nav.Link>
              <Nav.Link href="/login">Sign In <i className="fas fa-user"/></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header;