import {
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS
} from "../types";
import axios from "axios";

export const listProducts = () => async dispatch => {
  try {
    dispatch({type: PRODUCT_LIST_REQUEST});
    const {data} = await axios.get("/api/products");
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

