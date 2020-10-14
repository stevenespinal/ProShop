import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {productList, productDetails} from "./reducers/Products";
import {cart} from "./reducers/Cart";

const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];

const INITIAL_STATE = {
  cart: {
    cartItems: cartItemsFromStorage
  }
};

const reducer = combineReducers({
  productList,
  productDetail: productDetails,
  cart
});

const middleware = [thunk];

const store = createStore(reducer, INITIAL_STATE, composeWithDevTools(applyMiddleware(...middleware)));

export default store;