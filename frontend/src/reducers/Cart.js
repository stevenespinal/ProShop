import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS} from "../types";

export const cart = (state = {cartItems: [], shippingAddress: {}}, action) => {
  const {type, item, shippingAddress, method} = action;
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
      return {...state, cartItems: state.cartItems.filter(x => x.product !== action.item)};
    case CART_SAVE_SHIPPING_ADDRESS:
      return {...state, shippingAddress};
    case CART_SAVE_PAYMENT_METHOD:
      return {...state, method};
    // case CART_RESET_ITEMS:
    //   return {cartItems: [], shippingAddress: {}}
    default:
      return state;
  }
}
