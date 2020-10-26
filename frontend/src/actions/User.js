import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILED,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILED,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAILED,
  USER_DETAILS_RESET,
  ORDER_LIST_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILED,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILED,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS, USER_EDIT_FAILED, PRODUCT_CREATE_REVIEW_RESET
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

export const getUserDetails = id => async (dispatch, getState) => {
  try {
    dispatch({type: USER_DETAILS_REQUEST});

    const {userLogin: {userInfo}} = getState();
    const config = {
      headers: {
        'Content-Type': "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.get(`/api/users/${id}`, config);
    dispatch({type: USER_DETAILS_SUCCESS, user: data})

  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAILED,
      error: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}

export const updateUserProfile = user => async (dispatch, getState) => {
  try {
    dispatch({type: USER_UPDATE_PROFILE_REQUEST});

    const {userLogin: {userInfo}} = getState();
    const config = {
      headers: {
        'Content-Type': "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.put(`/api/users/profile`, user, config);
    dispatch({type: USER_UPDATE_PROFILE_SUCCESS, userInfo: data})

  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAILED,
      error: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({type: USER_LIST_REQUEST});

    const {userLogin: {userInfo}} = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.get(`/api/users`, config);
    dispatch({type: USER_LIST_SUCCESS, users: data});
  } catch (error) {
    dispatch({
      type: USER_LIST_FAILED,
      error: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}


export const deleteUser = userId => async (dispatch, getState) => {
  try {
    dispatch({type: USER_DELETE_REQUEST});

    const {userLogin: {userInfo}} = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    await axios.delete(`/api/users/${userId}`, config);
    dispatch({type: USER_DELETE_SUCCESS});
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAILED,
      error: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}

export const editUser = user => async (dispatch, getState) => {
  try {
    dispatch({type: USER_EDIT_REQUEST});

    const {userLogin: {userInfo}} = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.put(`/api/users/${user._id}`, user, config);
    dispatch({type: USER_EDIT_SUCCESS});
    dispatch({type: USER_DETAILS_SUCCESS, user: data});
  } catch (error) {
    dispatch({
      type: USER_EDIT_FAILED,
      error: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}


export const logout = () => dispatch => {
  localStorage.removeItem("userInfo");
  dispatch({type: USER_LIST_RESET});
  dispatch({type: USER_DETAILS_RESET});
  dispatch({type: ORDER_LIST_PROFILE_RESET});
  dispatch({type: PRODUCT_CREATE_REVIEW_RESET});
  dispatch({type: USER_LOGOUT});
}


