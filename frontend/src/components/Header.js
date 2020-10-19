import React from "react";
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/User";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const {userInfo} = userLogin;

  const logOutHandler = () => {
    dispatch(logout());
  }

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
              {userInfo ? <NavDropdown title={userInfo.name} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logOutHandler}>Log Out</NavDropdown.Item>
                </NavDropdown> :
              <LinkContainer to="/login">
                <Nav.Link>Sign In <i className="fas fa-user"/></Nav.Link>
              </LinkContainer>
                }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header;