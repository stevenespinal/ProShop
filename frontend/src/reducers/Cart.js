import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "../types";

export const cart = (state = {cartItems: []}, action) => {
  const {type, item} = action;
  switch (type) {
    case CART_ADD_ITEM:
      const cartItem = item;
      const existingItem = state.cartItems.find(x => x.product === cartItem.product);

      if (existingItem) {
        return {...state, cartItems: state.cartItems.map(x => x.product === existingItem.product ? cartItem : x)}
      } else {
        return {...state, cartItems: [...state.cartItems, cartItem]};
      }
    case CART_REMOVE_ITEM:
      return;
    default:
      return state;
  }
}