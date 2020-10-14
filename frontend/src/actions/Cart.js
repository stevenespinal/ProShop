import axios from "axios";
import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "../types";

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

export const removeFromCart = () => async dispatch => {
  dispatch({type: CART_REMOVE_ITEM});
}