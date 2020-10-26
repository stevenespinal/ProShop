import {
  PRODUCT_CREATE_FAILED,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_REVIEW_FAILED,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAILED,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAILED,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
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

export const deleteProduct = (state = {}, action) => {
  const {type, error} = action;
  switch (type) {
    case PRODUCT_DELETE_REQUEST:
      return {loading: true};
    case PRODUCT_DELETE_SUCCESS:
      return {loading: false, success: true};
    case PRODUCT_DELETE_FAILED:
      return {loading: false, error};
    default:
      return state;
  }
}

export const createProduct = (state = {}, action) => {
  const {type, error, product} = action;
  switch (type) {
    case PRODUCT_CREATE_REQUEST:
      return {loading: true};
    case PRODUCT_CREATE_SUCCESS:
      return {loading: false, product};
    case PRODUCT_CREATE_FAILED:
      return {loading: false, error};
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
}

export const updateProduct = (state = {product: {}}, action) => {
  const {type, error, product} = action;
  switch (type) {
    case PRODUCT_UPDATE_REQUEST:
      return {loading: true};
    case PRODUCT_UPDATE_SUCCESS:
      return {loading: false, product, success: true};
    case PRODUCT_UPDATE_FAILED:
      return {loading: false, error};
    case PRODUCT_UPDATE_RESET:
      return {product: {}};
    default:
      return state;
  }
}

export const createReview = (state = {}, action) => {
  const {type, error} = action;
  switch (type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return {loading: true};
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {loading: false, success: true};
    case PRODUCT_CREATE_REVIEW_FAILED:
      return {loading: false, error};
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
}