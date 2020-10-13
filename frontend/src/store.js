import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {productList, productDetails} from "./reducers/Products";

const INITIAL_STATE = {};

const reducer = combineReducers({
  productList,
  productDetail: productDetails
});

const middleware = [thunk];

const store = createStore(reducer, INITIAL_STATE, composeWithDevTools(applyMiddleware(...middleware)));

export default store;