import React, {useEffect} from "react";
import {fetchOrder} from "../actions/Order";
import {useDispatch, useSelector} from "react-redux";
import {Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import Message from "../components/Message";
import {Link} from "react-router-dom";
import Loader from "../components/Loader";

const OrderScreen = ({match}) => {
  const dispatch = useDispatch();
  const fetchOrderState = useSelector(({fetchOrder}) => fetchOrder);
  const {loading, order, error} = fetchOrderState;

  useEffect(() => {
    if (!order || order._id !== match.params.id) {
      dispatch(fetchOrder(match.params.id))
    }
  }, [dispatch, match.params.id]);

  if (!loading && order) {
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
  }

  return loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (
    <>
      <h1>Thank you for your order {order.user.name}!</h1>
      <h4>Order #{order._id}</h4>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping:</h2>
              <p><strong>Name: </strong> {order.user.name}</p>
              <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? <Message variant="success">Delivered At {order.deliveredAt}</Message> : <Message variant="danger">Not Delivered</Message>}

            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method:</h2>
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? <Message variant="success">Paid On {order.paidAt}</Message> : <Message variant="danger">Not Paid</Message>}
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
        <Col md={4}>
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
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen;