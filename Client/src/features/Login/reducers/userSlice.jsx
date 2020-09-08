import { createSlice } from "@reduxjs/toolkit";
import { userConstants } from "../../../constants/user.constants.jsx";

const userSlice = createSlice({
  name: "user",
  initialState: { success: false, data: {} },
  reducers: {
    getAuth(state, action) {
      // const { id, text } = action.payload;
      // state.push({ id, text, completed: false });
    },

    // success: (state, action) => {
    //   state = { type: userConstants.LOGIN_SUCCESS, action };
    // },
    login: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: {},
});

const { reducer, actions } = userSlice;
export const { login } = actions;
export default reducer;
