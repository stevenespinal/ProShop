import React, {useEffect} from "react";
import {Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Product from "../components/Product";
import {listProducts} from "../actions/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";

const HomeScreen = ({match}) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {loading, error, products, pages, page} = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> :
        <>
          <Row>
            {products.map(product => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product}/>
                </Col>
              )
            })}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
        </>
      }
    </>
  )
}

export default HomeScreen;