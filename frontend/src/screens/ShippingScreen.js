import React, {useState} from "react";
import {Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/Form";
import CheckoutSteps from "../components/CheckoutSteps";
import {saveShippingAddress} from "../actions/Cart";

const ShippingScreen = ({history}) => {
  const shippingAddress = useSelector(({cart: {shippingAddress}}) => shippingAddress);
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveShippingAddress({address, city, postalCode, country}));
    history.push("/payment");
  }

  return (
    <FormContainer>
      <CheckoutSteps login/>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            required
            onChange={e => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            required
            onChange={e => setCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode}
            required
            onChange={e => setPostalCode(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            required
            onChange={e => setCountry(e.target.value)}
          />
        </Form.Group>
        <Button className="mr-3" type="button" variant="info" onClick={() => history.push("/login")}>Go Back</Button>
        <Button type="submit" variant="primary">Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen;