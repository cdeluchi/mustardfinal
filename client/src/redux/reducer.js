import { combineReducers } from "redux";
import friendsReducer from "./users/slice";
import messagesReducer from "./messages/slice";

const rootReducer = combineReducers({
    data: friendsReducer,
    messages: messagesReducer,
});

export default rootReducer;
