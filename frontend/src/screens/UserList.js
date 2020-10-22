import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/Form";
import {LinkContainer} from "react-router-bootstrap";
import {Table, Button} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {listUsers} from "../actions/User";

const UserList = ({history}) => {
  const dispatch = useDispatch();
  const userList = useSelector(({userList}) => userList);
  const {loading, error, users} = userList;
  const userLogin = useSelector(({userLogin}) => userLogin);
  const {userInfo} = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }

  }, [dispatch, history, userInfo]);

  const deleteHandler = userId => {
    console.log("deleted");
  }

  return (
    <>
      <h1>Users</h1>
      {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
          <tr>
            <th>USER ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th>ACTION</th>
          </tr>
          </thead>
          <tbody>
          {users && users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td>
                {user.isAdmin ? <i className="fas fa-check" style={{color: "green"}}/> :
                  <i className="fas fa-times" style={{color: "red"}}/>}
              </td>
              <td>
                <LinkContainer to={`/user/${user._id}/edit`}>
                  <Button variant="light" type="button" className="btn-sm">
                    <i className="fas fa-edit"/>
                  </Button>
                </LinkContainer>
                <Button variant="danger" type="button" className="btn-sm" onClick={() => deleteHandler(user._id)}>
                  <i className="fas fa-trash"/>
                </Button>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserList;