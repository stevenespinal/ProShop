import React from "react";
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import {Route} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/User";
import SearchBox from "./SearchBox";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const cartItems = useSelector(({cart: {cartItems}}) => cartItems);
  const {userInfo} = userLogin;
  const cartItemsLength = () => cartItems.reduce((acc, item) => acc + item.qty, 0)

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
            <Route render={({history}) => <SearchBox history={history}/>}/>
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>({cartItemsLength()}) Cart <i className="fas fa-shopping-cart"/></Nav.Link>
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
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="admin">
                  <LinkContainer to="/admin/user-list">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/product-list">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/order-list">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header;