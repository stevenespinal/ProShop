import {
  ORDER_CREATE_FAILED,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_FETCH_BY_ID_FAILED,
  ORDER_FETCH_BY_ID_REQUEST,
  ORDER_FETCH_BY_ID_SUCCESS
} from "../types";

export const createOrder = (state = {}, action) => {
  const {type, order, error} = action;
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return {loading: true};
    case ORDER_CREATE_SUCCESS:
      return {loading: false, success: true, order}
    case ORDER_CREATE_FAILED:
      return {loading: false, error}
    default:
      return state;
  }
}

export const fetchOrder = (state = {loading: true, orderItems: [], shippingAddress: {}}, action) => {
  const {type, order, error} = action;
  switch (type) {
    case ORDER_FETCH_BY_ID_REQUEST:
      return {...state, loading: true};
    case ORDER_FETCH_BY_ID_SUCCESS:
      return {loading: false, order};
    case ORDER_FETCH_BY_ID_FAILED:
      return {loading: false, error}
    default:
      return state;
  }
}