import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Row, Col, Image, Button, Card, ListGroup, Form} from "react-bootstrap";
import Rating from "../components/Rating";
import {detailProducts, createReview, deleteReview} from "../actions/Product";
import {PRODUCT_CREATE_REVIEW_RESET, PRODUCT_DELETE_REVIEW_RESET} from "../types";
import Loader from "../components/Loader";
import Message from "../components/Message";
import moment from "moment";

const ProductScreen = ({match, history}) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [deletedSuccess, setDeletedSuccess] = useState("");
  const dispatch = useDispatch();
  const productDetail = useSelector(({productDetail}) => productDetail);
  const {loading, error, product} = productDetail;
  const reviewProduct = useSelector(({createReview}) => createReview);
  const {error: errorReview, success} = reviewProduct;
  const userLogin = useSelector(({userLogin}) => userLogin);
  const {userInfo} = userLogin;
  const deleteProductReview = useSelector(({deleteReview}) => deleteReview);
  const {success: deleteSuccess} = deleteProductReview;

  useEffect(() => {
    if (success) {
      setRating(0);
      setComment("");
    }

    if (deleteSuccess) {
      setDeletedSuccess("Successfully Deleted Review")
      setTimeout(() => {
        dispatch({type: PRODUCT_DELETE_REVIEW_RESET});
        setDeletedSuccess("");
      }, 5000);
    }

    dispatch({type: PRODUCT_CREATE_REVIEW_RESET});
    dispatch(detailProducts(match.params.id));


  }, [dispatch, match.params.id, success, deleteSuccess]);

  const addToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  }

  const submitProduct = () => {
    if (comment === "" && rating === 0) {
      setRatingError("Please enter a rating");
      setCommentError("Please enter a comment");
    } else if (comment && rating === 0) {
      setCommentError("");
      setRatingError("Please enter a rating");
    } else if (comment === "" && Number(rating) > 0) {
      setRatingError("");
      setCommentError("Please enter a comment");
    } else {
      setCommentError("");
      setRatingError("");
      dispatch(createReview(match.params.id, {rating, comment}))
    }
  };

  const handleDelete = (reviewUser) => {
    if (userInfo._id === reviewUser) {
      dispatch(deleteReview(match.params.id));
    }
  }

  return (
    <>
      <Link to="/" className="btn btn-dark my-3">Go Back</Link>
      {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> :
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && <ListGroup.Item>
                    <Row>
                      <Col>Qty:</Col>
                      <Col>
                        <Form.Control as="select" value={qty} onChange={e => setQty(e.target.value)}>
                          {[...Array(product.countInStock).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>}
                  <ListGroup.Item>
                    <Button onClick={addToCart} className="btn-block" type="button"
                            disabled={product.countInStock === 0}>Add
                      To Cart</Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              {deleteSuccess && <Message variant="success">{deletedSuccess}</Message>}
              <h2 className="my-2">Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating}/>
                    <p>{moment(review.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    <p>{review.comment}</p>
                    {userInfo && (review.user === userInfo._id) &&
                    <span style={{color: "red", cursor: "pointer"}} onClick={() => handleDelete(review.user)}><i
                      className="fas fa-times"/> Delete Review</span>}
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a review</h2>
                  {errorReview && <Message variant="danger">{errorReview}</Message>}
                  {userInfo ? (
                    <Form>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as="select" value={rating} onChange={e => setRating(e.target.value)}>
                          <option value="0">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                        {ratingError && <Message variant="danger">{ratingError}</Message>}
                      </Form.Group>
                      <Form.Group controlId="comment" className="my-2">
                        <Form.Label>Write a Comment</Form.Label>
                        <Form.Control as="textarea" row="3" value={comment} onChange={e => setComment(e.target.value)}/>
                        {commentError && <Message variant="danger">{commentError}</Message>}
                        <Button type="button" variant="primary" className="my-3" onClick={() => submitProduct()}>Submit
                          Review</Button>
                      </Form.Group>
                    </Form>
                  ) : <Message>Please <Link to="/login">sign in</Link> to write a review</Message>}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      }
    </>
  )
}

export default ProductScreen;