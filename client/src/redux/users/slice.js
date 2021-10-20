export default function friendsReducer(state = null, action) {
    console.log("friends in action Slice reducer", action);
    console.log("friends in data Slice reducer", state);

    if (action.type == "friends/addFriends") {
        state = action.payload.friends;
    } else if (action.type === "friends/acceptedFriendship") {
        state = state.map((friends) => {
            if (friends.id == action.payload.id) {
                return {
                    ...friends,
                    accepted: true,
                };
            } else {
                return friends;
            }
        });
    } else if (action.type === "friends/unfriendship") {
        let newState = [...state];
        newState = state.filter((friend) => friend.id != action.payload.id);
        return newState;
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
    console.log("unfriendship", id);
    return {
        type: "friends/unfriendship",
        payload: { id },
    };
}

export function acceptedFriendship(id) {
    console.log("acceptedFriendship", id);
    return {
        type: "friends/acceptedFriendship",
        payload: { id },
    };
}
