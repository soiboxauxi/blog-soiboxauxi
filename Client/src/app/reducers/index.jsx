import { combineReducers } from "redux";
import userReducer from "../../features/Login/reducers/userSlice.jsx";
//import visibilityFilterReducer from "features/filters/filtersSlice";

const rootReducer = combineReducers({
  user: userReducer,
  //visibilityFilter: visibilityFilterReducer,
});

export default rootReducer;
