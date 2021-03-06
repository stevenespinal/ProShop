import {
  PRODUCT_CREATE_FAILED,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_REVIEW_FAILED,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAILED,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_REVIEW_FAILED,
  PRODUCT_DELETE_REVIEW_REQUEST,
  PRODUCT_DELETE_REVIEW_SUCCESS,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS, PRODUCT_TOP_FAILED, PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS,
  PRODUCT_UPDATE_FAILED,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS
} from "../types";
import axios from "axios";

export const listProducts = (keyword = "", pageNumber = "") => async dispatch => {
  try {
    dispatch({type: PRODUCT_LIST_REQUEST});
    const {data} = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
    dispatch({type: PRODUCT_LIST_SUCCESS, products: data});
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAILED,
      error: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}


export const detailProducts = (id) => async dispatch => {
  try {
    dispatch({type: PRODUCT_DETAILS_REQUEST});
    const {data} = await axios.get(`/api/products/${id}`);
    dispatch({type: PRODUCT_DETAILS_SUCCESS, product: data});
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAILED,
      error: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}

export const deleteProduct = id => async (dispatch, getState) => {
  try {
    dispatch({type: PRODUCT_DELETE_REQUEST});

    const {userLogin: {userInfo}} = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.delete(`/api/products/${id}`, config);
    dispatch({type: PRODUCT_DELETE_SUCCESS});
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAILED,
      error: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}

export const createProduct = productData => async (dispatch, getState) => {
  try {
    dispatch({type: PRODUCT_CREATE_REQUEST});

    const {userLogin: {userInfo}} = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.post(`/api/products`, productData, config);
    dispatch({type: PRODUCT_CREATE_SUCCESS, product: data});
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAILED,
      error: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}


export const updateProduct = productData => async (dispatch, getState) => {
  try {
    dispatch({type: PRODUCT_UPDATE_REQUEST});

    const {userLogin: {userInfo}} = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.put(`/api/products/${productData._id}`, productData, config);
    dispatch({type: PRODUCT_UPDATE_SUCCESS, product: data});
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAILED,
      error: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}


export const createReview = (productId, reviewData) => async (dispatch, getState) => {
  try {
    dispatch({type: PRODUCT_CREATE_REVIEW_REQUEST});

    const {userLogin: {userInfo}} = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.post(`/api/products/${productId}/review`, reviewData, config);
    dispatch({type: PRODUCT_CREATE_REVIEW_SUCCESS});
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAILED,
      error: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}


export const deleteReview = productId => async (dispatch, getState) => {
  try {
    dispatch({type: PRODUCT_DELETE_REVIEW_REQUEST});

    const {userLogin: {userInfo}} = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.delete(`/api/products/${productId}/review`, config);
    dispatch({type: PRODUCT_DELETE_REVIEW_SUCCESS});
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_REVIEW_FAILED,
      error: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}

export const topProducts = () => async dispatch => {
  try {
    dispatch({type: PRODUCT_TOP_REQUEST});
    const {data} = await axios.get(`/api/products/top`);
    dispatch({type: PRODUCT_TOP_SUCCESS, products: data});
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAILED,
      error: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}
