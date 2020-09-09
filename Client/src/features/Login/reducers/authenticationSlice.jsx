import { createSlice } from "@reduxjs/toolkit";
import { userConstants } from "../../../constants/user.constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialStatex = user ? { loggedIn: false, user } : {};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: initialStatex,
  reducers: {
    authentication: (state, action) => {
      switch (action.payload) {
        case userConstants.LOGIN_REQUEST:
          return {
            loggingIn: true,
            user: action.user,
          };
        case userConstants.LOGIN_SUCCESS:
          return {
            loggedIn: true,
            user: action.user,
          };
        case userConstants.LOGIN_FAILURE:
          return {};
        case userConstants.LOGOUT:
          return { loggedIn: false, user: action.user };
        default:
          return state;
      }
    },
  },
});

const { reducer, actions } = authenticationSlice;
export const { authentication } = actions;
export default reducer;
