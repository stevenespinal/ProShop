import {
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS
} from "../types";

export const productList = (state = {products: []}, action) => {
  const {type, products, error} = action;
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return {loading: true, products: []};
    case PRODUCT_LIST_SUCCESS:
      return {loading: false, products};
    case PRODUCT_LIST_FAILED:
      return {loading: false, products: [], error};
    default:
      return state;
  }
}

export const productDetails = (state = {product: {reviews: []}}, action) => {
  const {type, product, error} = action;
  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return {loading: true, product: {}};
    case PRODUCT_DETAILS_SUCCESS:
      return {loading: false, product};
    case PRODUCT_DETAILS_FAILED:
      return {loading: false, product: {}, error};
    default:
      return state;
  }
}
