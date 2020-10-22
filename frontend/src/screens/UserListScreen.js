import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import {Table, Button, Modal} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {listUsers, deleteUser} from "../actions/User";

const UserListScreen = ({history}) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const userList = useSelector(({userList}) => userList);
  const {loading, error, users} = userList;
  const userLogin = useSelector(({userLogin}) => userLogin);
  const {userInfo} = userLogin;
  const userDelete = useSelector(({userDelete}) => userDelete);
  const {success} = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }

  }, [dispatch, history, userInfo, success]);

  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);

  const deleteHandler = userId => {
    dispatch(deleteUser(userId));
    setShow(false);
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
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                  <Button variant="light" type="button" className="btn-sm">
                    <i className="fas fa-edit"/>
                  </Button>
                </LinkContainer>
                <Button variant="danger" type="button" className="btn-sm" onClick={() => showModal()}>
                  <i className="fas fa-trash"/>
                </Button>
                <Modal show={show} onHide={() => hideModal()}>
                  <Modal.Header closeButton>
                    <Modal.Title>Delete {user.name}?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are you sure you would like to delete this user?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => hideModal()}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={() => deleteHandler(user._id)}>
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen;