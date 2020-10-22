import React, { useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import {Table, Button, Modal, Row, Col} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {listProducts, deleteProduct} from "../actions/Product";

const ProductListScreen = ({history, match}) => {
  const dispatch = useDispatch();
  const userLogin = useSelector(({userLogin}) => userLogin);
  const {userInfo} = userLogin
  const productList = useSelector(({productList}) => productList);
  const {loading, error, products} = productList;
  const productDelete = useSelector(({deleteProduct}) => deleteProduct);
  const {success, error: productDeleteError, loading: loadingDelete} = productDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/login");
    }

  }, [dispatch, history, userInfo, success]);

  const deleteProductHandler = productId => {
    dispatch(deleteProduct(productId));
  }

  const createProduct = () => {

  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={() => createProduct()}><i className="fas fa-plus fa-1x"/> Create</Button>
        </Col>
      </Row>
      {loadingDelete && <Loader/>}
      {productDeleteError && <Message variant="danger">{productDeleteError}</Message>}
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
                  <Button variant="danger" type="button" className="btn-sm" onClick={() => deleteProductHandler(product._id)}>
                    <i className="fas fa-trash"/>
                  </Button>
                </td>
              </tr>
            )
          })}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ProductListScreen;