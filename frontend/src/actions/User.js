import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILED,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST
} from "../types";
import axios from "axios";

export const login = (email, password) => async dispatch => {
  try {
    dispatch({type: USER_LOGIN_REQUEST});
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const {data} = await axios.post("/api/users/login", {email, password}, config);
    dispatch({type: USER_LOGIN_SUCCESS, userInfo: data});
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILED,
      error: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}

export const register = (name, email, password) => async dispatch => {
  try {
    dispatch({type: USER_REGISTER_REQUEST});
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const {data} = await axios.post("/api/users", {name, email, password}, config);
    console.log(data);
    dispatch({type: USER_REGISTER_SUCCESS, userInfo: data});
    dispatch({type: USER_LOGIN_SUCCESS, userInfo: data});
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILED,
      error: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}

export const logout = () => dispatch => {
  localStorage.removeItem("userInfo");
  dispatch({type: USER_LOGOUT});
}


