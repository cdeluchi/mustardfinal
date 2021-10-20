export default function friendsReducer(state = null, action) {
    console.log("friends in action Slice reducer", action);
    console.log("friends in data Slice reducer", state);

    if (action.type == "friends/addFriends") {
        state = action.payload.friends;
    } else if (action.type === "friends/cancelFriends") {
        state = state.map((friends) => {
            if (friends.userId == action.payload.myfriendId) {
                return {
                    ...friends,
                    accepted: true,
                };
            } else {
                return friends;
            }
        });
    }
    return state;
}

export function addFriends(friends) {
    console.log("NEW friends in Slice", friends);
    return {
        type: "friends/addFriends",
        payload: { friends },
    };
}

export function unfriendship(id) {
    console.log("unfriend", id);
    return {
        type: "friend/unfriends",
        payload: { id },
    };
}

export function acceptedFriendship(id) {
    console.log("acceptedFriend", id);
    return {
        type: "friend/acceptedFriend",
        payload: { id },
    };
}
