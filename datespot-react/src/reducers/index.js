import { combineReducers } from "redux";
import spotReducer from "./spotReducer";
import authReducer from "./authReducer";
import tagReducer from "./tagReducer";
import alertReducer from "./alertReducer";

export default combineReducers({
  spot: spotReducer,
  auth: authReducer,
  tag: tagReducer,
  alert: alertReducer,
});
