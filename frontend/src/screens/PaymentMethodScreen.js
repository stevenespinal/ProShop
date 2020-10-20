import React, {useState} from "react";
import {Form, Button, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/Form";
import CheckoutSteps from "../components/CheckoutSteps";
import {savePaymentMethod} from "../actions/Cart";

const PaymentMethodScreen = ({history}) => {
  const shippingAddress = useSelector(({cart: {shippingAddress}}) => shippingAddress);
  if (!shippingAddress) {
    history.push("/shipping");
  }
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");


  const submitHandler = e => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/place-order");
  }

  return (
    <FormContainer>
      <CheckoutSteps login shipping payment/>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="paymentMethod">
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="paypal" name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>

        </Form.Group>
        <Button className="mr-3" type="button" variant="info" onClick={() => history.push("/shipping")}>Go Back</Button>
        <Button type="submit" variant="primary">Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentMethodScreen;