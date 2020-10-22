import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Container} from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserList from "./screens/UserList";

const App = () => {
  return (
    <Router>
      <Header/>
      <main className="py-4">
        <Container>
          <Route exact path="/" component={HomeScreen}/>
          <Route path="/login" component={LoginScreen}/>
          <Route path="/register" component={RegisterScreen}/>
          <Route path="/profile" component={ProfileScreen}/>
          <Route path="/shipping" component={ShippingScreen}/>
          <Route path="/payment" component={PaymentMethodScreen}/>
          <Route path="/place-order" component={PlaceOrderScreen}/>
          <Route path="/orders/:id" component={OrderScreen}/>
          <Route path="/product/:id" component={ProductScreen}/>
          <Route path="/cart/:id?" component={CartScreen}/>
          <Route path="/admin/user-list" component={UserList}/>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;