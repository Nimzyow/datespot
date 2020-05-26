import { combineReducers } from "redux";
import spotReducer from "./spotReducer";

export default combineReducers({
  spot: spotReducer,
});
