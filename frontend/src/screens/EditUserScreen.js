import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {getUserDetails, editUser} from "../actions/User";
import {USER_EDIT_RESET} from "../types";
import FormContainer from "../components/Form";

const EditUserScreen = ({match, history}) => {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const userDetails = useSelector(({userDetails}) => userDetails);
  const {loading, error, user} = userDetails;
  const userUpdate = useSelector(({userEdit}) => userEdit);
  const {loading: loadingEdit, success: successEdit, error: errorEdit} = userUpdate;

  useEffect(() => {
    if (successEdit) {
      dispatch({type: USER_EDIT_RESET});
      history.push("/admin/user-list");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setEmail(user.email);
        setName(user.name);
        setIsAdmin(user.isAdmin);
      }
    }

  }, [user, dispatch, userId, successEdit, history]);

  const editUserHandler = (e) => {
    e.preventDefault();
    dispatch(editUser({_id: userId, name, email, isAdmin}));
  }

  return (
    <>
      <Link to={`/admin/user-list`} className="btn btn-dark my-3">Go Back</Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingEdit && <Loader/>}
        {errorEdit && <Message variant="danger">{errorEdit}</Message>}
        {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (

          <Form onSubmit={editUserHandler}>
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
            <Form.Group controlId="is-admin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">Update</Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default EditUserScreen;
