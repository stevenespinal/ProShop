import {USER_LOGIN_FAILED, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT} from "../types";

export const userLogin = (state = {}, action) => {
  const {type, userInfo, error} = action;
  switch (type) {
    case USER_LOGIN_REQUEST:
      return {loading: true};
    case USER_LOGIN_SUCCESS:
      return {loading: false, userInfo}
    case USER_LOGIN_FAILED:
      return {loading: false, error}
    case USER_LOGOUT:
      return {}
    default:
      return state;
  }
}
