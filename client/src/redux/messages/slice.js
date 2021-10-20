// one action creator to initially add to global state the 10 most recent messages

export default function messagesReducer(state = null, action) {
    if (action.type == "messages/latestTenMsgsReceived") {
        return [...action.payload.messages];
    } else if (action.type == "message/newMessagereceived") {
        return [action.payload.message.newMsg, ...state];
    }
    return state;
}

// another action creator to add any new chat messages to the list

export function chatMessageReceived(message) {
    return {
        type: "message/chatMessageReceived",
        payload: { message },
    };
}
// these actions creators need to be imported in socket.js and called in there!

export function latestTenMsgsReceived(message) {
    return {
        type: "messages/latestTenMsgsReceived",
        payload: { message },
    };
}
