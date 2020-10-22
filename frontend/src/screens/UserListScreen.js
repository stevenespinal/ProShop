import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import {Table, Button, Modal} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {listUsers, deleteUser} from "../actions/User";

const UserListScreen = ({history}) => {
  const [modal, setModal] = useState({
    show: false,
    data: {}
  });
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


  const deleteHandler = userId => {
    dispatch(deleteUser(userId));
    setModal({show: false, data: {}});
  }

  const handleClose = () => {
    setModal({show: false, data: {}});
  }

  const handleOpen = (data) => {
    setModal({show: true, data})
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
                <Button variant="danger" type="button" className="btn-sm" onClick={() => handleOpen(user)}>
                {/*<Button variant="danger" type="button" className="btn-sm" onClick={() => deleteHandler(user._id)}>*/}
                  <i className="fas fa-trash"/>
                </Button>
              </td>
            </tr>
          ))}
          <Modal show={modal.show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete {modal.data.name}?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete {modal.data.name}?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={() => deleteHandler(modal.data._id)}>
                Delete User
              </Button>
            </Modal.Footer>
          </Modal>
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen;