import {
  USER_DETAILS_FAILED, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAILED, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS
} from "../types";

export const userLogin = (state = {}, action) => {
  const {type, userInfo, error} = action;
  switch (type) {
    case USER_LOGIN_REQUEST:
      return {loading: true};
    case USER_LOGIN_SUCCESS:
      return {loading: false, userInfo};
    case USER_LOGIN_FAILED:
      return {loading: false, error};
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

export const userRegister = (state = {}, action) => {
  const {type, userInfo, error} = action;
  switch (type) {
    case USER_REGISTER_REQUEST:
      return {loading: true};
    case USER_REGISTER_SUCCESS:
      return {loading: false, userInfo};
    case USER_REGISTER_FAILED:
      return {loading: false, error};
    default:
      return state;
  }
}

export const userDetails = (state = {user: {}}, action) => {
  const {type, user, error} = action;
  switch (type) {
    case USER_DETAILS_REQUEST:
      return {...state, loading: true};
    case USER_DETAILS_SUCCESS:
      return {loading: false, user};
    case USER_DETAILS_FAILED:
      return {loading: false, error};
    case USER_DETAILS_RESET:
      return {user: {}}
    default:
      return state;
  }
}


export const userUpdateProfile = (state = {user: {}}, action) => {
  const {type, userInfo, error} = action;
  switch (type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {loading: true};
    case USER_UPDATE_PROFILE_SUCCESS:
      return {loading: false, userInfo, success: true};
    case USER_UPDATE_PROFILE_FAILED:
      return {loading: false, error};
    default:
      return state;
  }
}


