import { combineReducers } from "redux";
import spotReducer from "./spotReducer";
import authReducer from "./authReducer";
import tagReducer from "./tagReducer";

export default combineReducers({
  spot: spotReducer,
  auth: authReducer,
  tag: tagReducer,
});
