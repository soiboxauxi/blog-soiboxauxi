import { combineReducers } from "redux";
import authenticationReducer from "../../features/Login/reducers/authenticationSlice";
import userReducer from "../../features/Login/reducers/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
  authentication: authenticationReducer,
});

export default rootReducer;
