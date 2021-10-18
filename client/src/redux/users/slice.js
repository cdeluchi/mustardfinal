export default function friendsReducer(state = null, action) {
    console.log("friends in Slice reducer");
    if (action.type == "friends/addFriends") {
        state = action.payload.friends;
    } else if (action.type === "friends/cancelFriends") {
        state = state.map((friends) => {
            if (friends.id == action.payload.myfriendId) {
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

export function makeFriends(data) {
    console.log("NEW friends in Slice", data);
    return {
        type: "friends/makeFriends",
        payload: { data },
    };
}

export function noFriends(data) {
    console.log("NO friends in Slice", data);
    return {
        type: "friend/noFriend",
        payload: { data },
    };
}
