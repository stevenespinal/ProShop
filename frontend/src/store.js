import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {productList, productDetails} from "./reducers/Products";
import {cart} from "./reducers/Cart";
import {userLogin, userRegister, userDetails, userUpdateProfile, userList} from "./reducers/User";
import {createOrder, fetchOrder, payOrder, listProfileOrders} from "./reducers/Order";

const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
const shippingAddressFromStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {};
const paymentMethodFromStorage = localStorage.getItem("paymentMethod") ? JSON.parse(localStorage.getItem("paymentMethod")) : null;

const INITIAL_STATE = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    method: paymentMethodFromStorage
  },
  userLogin: {
    userInfo: userInfoFromStorage
  }
};

const reducer = combineReducers({
  productList,
  productDetail: productDetails,
  cart,
  userLogin,
  userRegister,
  userDetails,
  userUpdateProfile,
  userList,
  createOrder,
  fetchOrder,
  payOrder,
  listProfileOrders
});

const middleware = [thunk];

const store = createStore(reducer, INITIAL_STATE, composeWithDevTools(applyMiddleware(...middleware)));

export default store;