import { createSlice } from "@reduxjs/toolkit";
import { userConstants } from "../../../constants/user.constants";

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {},
  reducers: {
    authentication: (state, action) => {
      const { statelogin, data } = action.payload;
      switch (statelogin) {
        case userConstants.LOGIN_REQUEST:
          return {
            loggingIn: true,
            user: action.user,
          };
        case userConstants.LOGIN_SUCCESS:
          const { authToken, expriedAt } = data;
          return {
            loggedIn: true,
            authToken: authToken,
            expriedAt: expriedAt,
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
