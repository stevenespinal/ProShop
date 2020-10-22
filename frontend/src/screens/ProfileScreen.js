import React, {useEffect, useState} from "react";
import {Form, Button, Row, Col, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {getUserDetails, updateUserProfile} from "../actions/User";
import {listProfileOrders} from "../actions/Order";
import {LinkContainer} from "react-router-bootstrap";
import moment from "moment";

const ProfileScreen = ({history}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const userDetails = useSelector(({userDetails}) => userDetails);
  const {loading, error, user} = userDetails;
  const userLogin = useSelector(({userLogin}) => userLogin);
  const {userInfo} = userLogin;
  const userUpdateProfile = useSelector(({userUpdateProfile}) => userUpdateProfile);
  const {success} = userUpdateProfile;
  const orderProfileList = useSelector(({listProfileOrders}) => listProfileOrders);
  const {loading: loadingOrders, error: errorOrders, orders} = orderProfileList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listProfileOrders());
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, dispatch, user, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({id: user._id, name, email, password}));
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {success && <Message variant="success">Profile Updated</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="id">
            <Form.Label>User Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="User Id"
              value={user._id || ""}
              disabled
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">Update Profile</Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? <Loader/> : errorOrders ? <Message variant="danger">{errorOrders}</Message> : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
            <tr>
              <th>ORDER ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {orders && orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{moment(order.created_at).format('MMMM Do YYYY, h:mm:ss a')}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isPaid ? moment(order.paidAt).format('MMMM Do YYYY, h:mm a') :
                  <i className="fas fa-times" style={{color: "red"}}/>}</td>
                <td>{order.isDelivered ? moment(order.deliveredAt).format('MMMM Do YYYY, h:mm a') :
                  <i className="fas fa-times" style={{color: "red"}}/>}</td>
                <td><LinkContainer to={`/orders/${order._id}`}><Button variant="light"
                                                                       className="btn-sm">Details</Button></LinkContainer>
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen;