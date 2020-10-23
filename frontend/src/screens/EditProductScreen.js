import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {detailProducts, updateProduct} from "../actions/Product";
import FormContainer from "../components/Form";
import {PRODUCT_UPDATE_RESET} from "../types";
import axios from "axios";

const EditProductScreen = ({match, history}) => {
  const productId = match.params.id;
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const productDetails = useSelector(({productDetail}) => productDetail);
  const {loading, error, product} = productDetails;
  const updateProducts = useSelector(({updateProduct}) => updateProduct);
  const {loading: loadingUpdateProduct, error: errorUpdateProduct, success: successUpdateProduct} = updateProducts;

  useEffect(() => {
    if (successUpdateProduct) {
      dispatch({type: PRODUCT_UPDATE_RESET});
      history.push("/admin/product-list");
      dispatch(detailProducts(productId));
    } else {
      if (!product || product._id !== productId) {
        dispatch(detailProducts(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setStock(product.countInStock);
        setDescription(product.description);
      }
    }
    //eslint-disable-next-line
  }, [dispatch, successUpdateProduct, productId, history, product.name, product.price, product.image, product.brand, product.category, product.countInStock, product.description, product._id]);

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

  const editUserHandler = (e) => {
    e.preventDefault();
    const productUpdatedData = {
      name,
      price,
      image,
      brand,
      category,
      countInStock: stock,
      description,
      _id: productId
    }
    dispatch(updateProduct(productUpdatedData));
  }

  return (
    <>
      <Link to={`/admin/product-list`} className="btn btn-dark my-3">Go Back</Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdateProduct && <Loader/>}
        {errorUpdateProduct && <Message variant="danger">{errorUpdateProduct}</Message>}
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
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Image"
                value={image}
                onChange={e => setImage(e.target.value)}
              />
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={handleUploadFile}
              />
              {uploading && <Loader/>}
            </Form.Group>
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
            <Button variant="primary" type="submit">Update</Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default EditProductScreen;
