import { combineReducers } from "redux";
import friendsReducer from "./users/slice";

const rootReducer = combineReducers({ friends: friendsReducer });

export default rootReducer;
