import { createSlice } from "@reduxjs/toolkit";
import { userService } from "services/user";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    getAuth(state, action) {
      const { id, text } = action.payload;
      state.push({ id, text, completed: false });
    },

    login: (state, action) => {
      console.log(action.payload);
      const { username, password } = action.payload;

      //Check username ???
      //dispatch(request({ username }));
      console.log(action.payload);
      userService.login(username, password).then(
        (user) => {
          //dispatch(success(user));
          //history.push("/");
          console.log("Login thành công");
        },
        (error) => {
          //dispatch(failure(error));
          //dispatch(alertActions.error(error));
          console.log("Login thất bại");
        },
      );
    },
  },
});
export const { getAuth, login } = userSlice.actions;
export default userSlice.reducer;
