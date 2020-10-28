import React, {useEffect} from "react";
import {Carousel, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import {topProducts} from "../actions/Product";
import {useDispatch, useSelector} from "react-redux";
import Loader from "./Loader";
import Message from "./Message";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const topProduct = useSelector(({topProducts}) => topProducts);
  const {loading, error, products} = topProduct;

  useEffect(() => {
    dispatch(topProducts());
  }, [dispatch])

  return loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (
    <>
      <Carousel pause="hover" className="bg-dark">
        {products.map(product => (
          <Carousel.Item key={product._id}>
            <Link to={`/products/${product._id}`}>
              <Image src={product.image} alt={product.name} fluid/>
              <Carousel.Caption className="carousel-caption">
                <h2>{product.name} (${product.price})</h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  )
}

export default ProductCarousel;