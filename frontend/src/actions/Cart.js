import axios from "axios";
import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD} from "../types";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const {data} = await axios.get(`/api/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    item: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = id => (dispatch, getState) => {
  dispatch({type: CART_REMOVE_ITEM, item: id});
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const saveShippingAddress = data => dispatch => {
  dispatch({type: CART_SAVE_SHIPPING_ADDRESS, shippingAddress: data});
  localStorage.setItem("shippingAddress", JSON.stringify(data));
}

export const savePaymentMethod = method => dispatch => {
  dispatch({type: CART_SAVE_PAYMENT_METHOD, method});
  localStorage.setItem("paymentMethod", JSON.stringify(method));
}