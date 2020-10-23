import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import {Table, Button, Modal, Row, Col, Form} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {listProducts, deleteProduct, createProduct} from "../actions/Product";
import {PRODUCT_CREATE_RESET} from "../types";
import axios from "axios";

const ProductListScreen = ({history, match}) => {
  const [modal, setModal] = useState({
    show: false,
    data: {}
  });

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const userLogin = useSelector(({userLogin}) => userLogin);
  const {userInfo} = userLogin
  const productList = useSelector(({productList}) => productList);
  const {loading, error, products} = productList;
  const productDelete = useSelector(({deleteProduct}) => deleteProduct);
  const {success, error: productDeleteError, loading: loadingDelete} = productDelete;

  const productCreate = useSelector(({createProduct}) => createProduct);
  const {success: successCreate, error: productCreateError, loading: loadingCreate, product} = productCreate;


  useEffect(() => {
    dispatch({type: PRODUCT_CREATE_RESET});
    if (userInfo === undefined) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${product._id}/edit`)
    } else {
      dispatch(listProducts());
    }

  }, [dispatch, history, userInfo, success, successCreate, product]);

  const deleteProductHandler = productId => {
    dispatch(deleteProduct(productId));
    setModal({show: false, data: {}});
  }

  const handleClose = () => {
    setModal({show: false, data: {}});
  }

  const handleOpen = (data) => {
    setModal({show: true, data})
  }

  const handleUploadFile = async (e) => {
    const {files} = e.target;
    const formData = new FormData();
    formData.append("image", files[0]);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const {data} = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  }


  const createProductHandler = () => {
    const data = {
      name,
      image,
      brand,
      price,
      countInStock: stock,
      description,
      category,
      user: userInfo._id
    }
    if (name === "" || image === "" || brand === "" || category === "") {
      console.log("Fill out inputs");
    } else {
      dispatch(createProduct(data));
      setShow(false);
    }
  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={() => setShow(true)}><i className="fas fa-plus fa-1x"/> Create</Button>
        </Col>
        <Modal show={show} onHide={() => setShow(false)}>
          {(name === "" || image === "" || brand === "" || category === "") &&
          <Message>* Please fill out all fields</Message>}
          <Modal.Header>
            <Modal.Title>Create A New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Product Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Product Image"
                  value={image}
                  onChange={e => setImage(e.target.value)}
                />
              </Form.Group>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={handleUploadFile}
              />
              {uploading && <Loader/>}
              <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Product Brand"
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Product Price"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="countInStock">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Stock"
                  value={stock}
                  onChange={e => setStock(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Product Category"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Product Description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => createProductHandler()}>
              Create Product
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
      {loadingDelete && <Loader/>}
      {productDeleteError && <Message variant="danger">{productDeleteError}</Message>}
      {loadingCreate && <Loader/>}
      {productCreateError && <Message variant="danger">{productCreateError}</Message>}
      {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
          <tr>
            <th>PRODUCT ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th>ACTION</th>
          </tr>
          </thead>
          <tbody>
          {products && products.map(product => {
            return (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" type="button" className="btn-sm">
                      <i className="fas fa-edit"/>
                    </Button>
                  </LinkContainer>
                  <Button variant="danger" type="button" className="btn-sm"
                          onClick={() => handleOpen(product)}>
                    <i className="fas fa-trash"/>
                  </Button>
                </td>
              </tr>
            )
          })}
          <Modal show={modal.show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete {modal.data.name}?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete {modal.data.name}?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={() => deleteProductHandler(modal.data._id)}>
                Delete Product
              </Button>
            </Modal.Footer>
          </Modal>
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ProductListScreen;