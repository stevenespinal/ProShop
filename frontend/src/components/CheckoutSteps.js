import React from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Breadcrumb} from "react-bootstrap";

const CheckoutSteps = ({login, shipping, payment, placeOrder}) => {
  return (
    <Breadcrumb className="justify-content-center mb-4">
      {login ? <LinkContainer to="/login"><Breadcrumb.Item active>Home</Breadcrumb.Item></LinkContainer> :
        <Breadcrumb.Item>Home</Breadcrumb.Item>}
      {shipping ? <LinkContainer to="/shipping"><Breadcrumb.Item active>Shipping</Breadcrumb.Item></LinkContainer> :
        <Breadcrumb.Item>Shipping</Breadcrumb.Item>}
      {payment ? <LinkContainer to="/payment"><Breadcrumb.Item active>Payment</Breadcrumb.Item></LinkContainer> :
        <Breadcrumb.Item disabled>Payment</Breadcrumb.Item>}
      {placeOrder ?
        <LinkContainer to="/place-order"><Breadcrumb.Item active>Place Order</Breadcrumb.Item></LinkContainer> :
        <Breadcrumb.Item>Place Order</Breadcrumb.Item>}
    </Breadcrumb>
  )
}

export default CheckoutSteps;