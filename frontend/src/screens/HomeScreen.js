import React, {useEffect} from "react";
import {Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Product from "../components/Product";
import {listProducts} from "../actions/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

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
     <Meta title="Welcome to ProShop" description="Best products for the low" keywords="electronics, cheap, low, products"/>
      {!keyword ? <ProductCarousel/> : <Link to="/" className="btn btn-dark mb-5">Go Back</Link>}
      {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : pages === 0 ?
        <h6 className="my-5"><i className="fas fa-redo-alt"/> No results found. Please try again or use a different search term. </h6> :
        <>
          <h3>Latest Products</h3>
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