// one action creator to initially add to global state the 10 most recent messages

export default function messagesReducer(state = null, action) {
    // console.log("message in action Slice", action);
    // console.log("message in data Slice", state);

    if (action.type == "message/chatMessage") {
        state = [...state, action.payload.message]; //bdquery
    } else if (action.type == "messages/latestTenMsgs") {
        state = action.payload.message;
    }
    return state;
}

export function chatMessage(message) {
    // console.log("chatMessage in SLICE");
    return {
        type: "message/chatMessage",
        payload: { message },
    };
}
// these actions creators need to be imported in socket.js and called in there!

export function latestTenMsgs(message) {
    // console.log("latestTenMsgs in SLICE");
    return {
        type: "messages/latestTenMsgs",
        payload: { message },
    };
}
