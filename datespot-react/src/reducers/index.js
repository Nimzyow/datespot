import { combineReducers } from "redux";
import spotReducer from "./spotReducer";
import authReducer from "./authReducer";

export default combineReducers({
  spot: spotReducer,
  auth: authReducer,
});
