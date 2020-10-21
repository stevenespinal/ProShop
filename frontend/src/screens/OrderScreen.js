import React, {useState, useEffect} from "react";
import {fetchOrder, payOrder} from "../actions/Order";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import axios from "axios";
import {Card, Col, Image, ListGroup, Row, Button} from "react-bootstrap";
import {PayPalButton} from "react-paypal-button-v2";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {ORDER_PAY_RESET} from "../types";

const OrderScreen = ({match}) => {
  const dispatch = useDispatch();
  const fetchOrderState = useSelector(({fetchOrder}) => fetchOrder);
  const {loading, order, error} = fetchOrderState;
  const [sdkReady, setSdkReady] = useState(false);

  const paymentOrderState = useSelector(({payOrder}) => payOrder);
  const {loading: loadingPay, success: successPay, error: errorPay} = paymentOrderState;

  useEffect(() => {
    const addPaypalScript = async () => {
      const {data: clientId} = await axios.get("/api/config/paypal");
      const script = document.createElement("script")
      script.type = "text/javascript";
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script);
    }

    if (successPay || !order || order._id !== match.params.id) {
      dispatch({type: ORDER_PAY_RESET});
      dispatch(fetchOrder(match.params.id))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, match.params.id, order, successPay]);

  if (!loading && order) {
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
  }

  const successPayment = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(match.params.id, paymentResult))
  }

  return loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (
    <>
      <h1>Thank you for your order {order.user.name}!</h1>
      <h4>Order #{order._id}</h4>
      <Row>
        <Col md={7}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping:</h2>
              <p><strong>Name: </strong> {order.user.name}</p>
              <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? <Message variant="success">Delivered At {order.deliveredAt}</Message> :
                <Message variant="danger">Not Delivered</Message>}

            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method:</h2>
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? <Message variant="success">Paid On {order.paidAt}</Message> :
                <Message variant="danger">Not Paid</Message>}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items:</h2>
              {order.orderItems.length === 0 ? <Message variant="danger">Your Cart Is Empty</Message> : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded/>
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>{item.qty} x ${item.price} = ${item.qty * item.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={5}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader/>}
                  {!sdkReady ? <Loader/> : <PayPalButton amount={order.totalPrice} onSuccess={successPayment}/>}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen;