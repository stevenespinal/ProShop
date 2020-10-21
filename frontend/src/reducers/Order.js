import {ORDER_CREATE_FAILED, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS} from "../types";

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