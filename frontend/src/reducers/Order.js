import {
  ORDER_CREATE_FAILED,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_FETCH_BY_ID_FAILED,
  ORDER_FETCH_BY_ID_REQUEST,
  ORDER_FETCH_BY_ID_SUCCESS,
  ORDER_LIST_PROFILE_FAILED,
  ORDER_LIST_PROFILE_REQUEST, ORDER_LIST_PROFILE_RESET,
  ORDER_LIST_PROFILE_SUCCESS,
  ORDER_PAY_FAILED,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS
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

export const payOrder = (state = {}, action) => {
  const {type, error} = action;
  switch (type) {
    case ORDER_PAY_REQUEST:
      return {loading: true};
    case ORDER_PAY_SUCCESS:
      return {loading: false, success: true};
    case ORDER_PAY_FAILED:
      return {loading: false, error};
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
}


export const listProfileOrders = (state = {orders: []}, action) => {
  const {type, orders, error} = action;
  switch (type) {
    case ORDER_LIST_PROFILE_REQUEST:
      return {loading: true};
    case ORDER_LIST_PROFILE_SUCCESS:
      return {loading: false, orders};
    case ORDER_LIST_PROFILE_FAILED:
      return {loading: false, error};
    case ORDER_LIST_PROFILE_RESET:
      return {orders: []};
    default:
      return state;
  }
}

