import { createSlice } from "@reduxjs/toolkit";
import { userConstants } from "../../../constants/user.constants.jsx";

const userSlice = createSlice({
  name: "user",
  initialState: { success: false, data: {} },
  reducers: {
    login: (state, action) => {
      return action.payload;
    },
    request: (state, action) => {
      return { type: userConstants.LOGIN_REQUEST, user: action.payload };
    },
    success: (state, action) => {
      return { type: userConstants.LOGIN_SUCCESS, user: action.payload };
    },
    failure: (state, action) => {
      return { type: userConstants.LOGIN_FAILURE, error: action.payload };
    },
    logout: (state, action) => {},
    getAll: (state, action) => {},
  },
  extraReducers: {},
});

const { reducer, actions } = userSlice;
export const { login, request, success, failure, logout, getAll } = actions;
export default reducer;
