import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {listAllOrders} from "../actions/Order";
import {Table, Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import moment from "moment";
import Message from "../components/Message";
import Loader from "../components/Loader";

const OrderListScreen = ({history}) => {
  const dispatch = useDispatch();
  const allOrders = useSelector(({listAllOrders}) => listAllOrders);
  const {loading, error, orders} = allOrders;

  const userLogin = useSelector(({userLogin}) => userLogin);
  const {userInfo} = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAllOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);


  return (
    <>
      <h1>Orders</h1>
      {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
          <tr>
            <th>ORDER ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th>ACTION</th>
          </tr>
          </thead>
          <tbody>
          {orders && orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user && order.user.name}</td>
              <td>{moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
              <td>${order.totalPrice}</td>
              <td>
                {order.isPaid ? (moment(order.paidAt).format('MMMM Do YYYY, h:mm:ss a')) :
                  <i className="fas fa-times" style={{color: "red"}}/>}
              </td>
              <td>
                {order.isDelivered ? (moment(order.deliveredAt).format('MMMM Do YYYY, h:mm:ss a')) :
                  <i className="fas fa-times" style={{color: "red"}}/>}
              </td>
              <td>
                <LinkContainer to={`/orders/${order._id}`}>
                  <Button variant="light" className="btn-sm">
                    Details
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      )}
    </>
  )

}


export default OrderListScreen;