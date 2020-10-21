import {
  ORDER_CREATE_FAILED,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS, ORDER_FETCH_BY_ID_FAILED, ORDER_FETCH_BY_ID_REQUEST, ORDER_FETCH_BY_ID_SUCCESS,
} from "../types";
import axios from "axios";

export const createOrder = order => async (dispatch, getState) => {
  try {
    dispatch({type: ORDER_CREATE_REQUEST});

    const {userLogin: {userInfo}} = getState();
    const config = {
      headers: {
        'Content-Type': "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.post(`/api/orders`, order, config);
    dispatch({type: ORDER_CREATE_SUCCESS, order: data})

  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAILED,
      error: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}

export const fetchOrder = order => async (dispatch, getState) => {
  try {
    dispatch({type: ORDER_FETCH_BY_ID_REQUEST});

    const {userLogin: {userInfo}} = getState();
    const config = {
      headers: {
        'Content-Type': "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.get(`/api/orders/${order}`, config);
    dispatch({type: ORDER_FETCH_BY_ID_SUCCESS, order: data});

  } catch (error) {
    dispatch({
      type: ORDER_FETCH_BY_ID_FAILED,
      error: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}