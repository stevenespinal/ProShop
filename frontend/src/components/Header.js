import React from "react";
import {Navbar, Nav, Container} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap"

const Header = () => {
  return (
    <header>
      <Navbar variant="dark" bg="dark" collapseOnSelect expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>Cart <i className="fas fa-shopping-cart"/></Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>Sign In <i className="fas fa-user"/></Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header;