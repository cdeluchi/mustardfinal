import ProfilePic from "./profilepic";
import { useEffect } from "react";

// Import useDispatch and useSelector from react-redux,
// the actions you are going to dispatch from your slice.js,
//and useEffect from react.
import { useDispatch, useSelector } from "react-redux";
import {
    acceptedFriendship, //receiveFriends
    addFriends, //receiveFriends
    unfriendship, //madeUnfriendFriend
} from "./redux/users/slice";

// Must export a function component because we want to use the
// useDispatch and useSelector hooks

export default function Friends({ imgurl, first, last, clickHandler }) {
    console.log("default Function in Friends");

    const dispatch = useDispatch();

    const myFriends = useSelector(
        (state) =>
            state.data &&
            state.data.filter((friends) => friends.accepted == true)
    );
    console.log("Friends", myFriends);

    const wannaBe = useSelector(
        (state) =>
            state.data &&
            state.data.filter((friends) => friends.accepted == false)
    );

    useEffect(() => {
        console.log("useEffect");

        fetch("/friends.json")
            .then((res) => res.json())
            .then((data) => {
                console.log("useEffect data in Friends.json", data);
                dispatch(addFriends(data));
            });
    }, []);

    const acceptedFriendship = (id) => {
        fetch("/acceptedFriend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                operation: "accept",
                other: id,
            }),
        }).then((res) =>
            res
                .json()
                .then((res) => {
                    if (res.success === true) {
                        // dispatch(acceptedFriendship(id));
                    }
                })
                .catch((err) => {
                    console.log("err in POST /acceptedFriend", err);
                })
        );
    };

    const unfriendship = (id) => {
        fetch("/unfriend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                operation: "cancel",
                other: id,
            }),
        }).then((res) =>
            res
                .json()
                .then((res) => {
                    if (res.success === true) {
                        // dispatch(unfriendship(friends));
                    }
                })
                .catch((err) => {
                    console.log("error in post cancel friendship", err);
                })
        );
    };

    return (
        <>
            <div className="friendsandWannabecontainer">
                <h1>Mais que amigos, Friends</h1>
                <div>
                    <ProfilePic
                        className="profilePic"
                        imageUrl={imgurl}
                        first={first}
                        last={last}
                        clickHandler={clickHandler}
                    />
                    <p>My Friends:</p>

                    {myFriends &&
                        myFriends.map((myFriends, i) => (
                            <p key={i}>
                                <img
                                    className="profilePic"
                                    src={myFriends.imgurl}
                                    alt="myFriend"
                                />
                                {myFriends.first}
                                {myFriends.last}
                                <button
                                    onClick={() =>
                                        dispatch(
                                            acceptedFriendship(myFriends.id)
                                        )
                                    }
                                >
                                    Unfriend
                                </button>
                            </p>
                        ))}
                </div>

                <div id="noFriends">
                    <p>They want to be my friends:</p>
                    {wannaBe &&
                        wannaBe.map((wannaBe, i) => (
                            <p key={i}>
                                <img
                                    className="profilePic"
                                    src={wannaBe.imgurl}
                                    alt="wannaBeFriend"
                                />
                                {wannaBe.first}
                                {wannaBe.last}
                                <button
                                    onClick={() =>
                                        dispatch(unfriendship(wannaBe.id))
                                    }
                                >
                                    accept
                                </button>
                            </p>
                        ))}
                </div>
            </div>
        </>
    );
}

// const acceptedFriends = (friendsId) => {
//     console.log("friendsId in acceptedFriends55", friendsId);
//     fetch("/setFriendship", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             operation: "accept",
//             other: friendsId,
//         }),
//     }).then((resp) =>
//         resp
//             .json()
//             .then((resp) => {
//                 console.log("res in acceptedFriends", resp);
//                 if (resp.success === true) {
//                     dispatch(acceptedFriends(friendsId));
//                 }
//             })
//             .catch((err) => {
//                 console.log("err in POST acceptFriendship", err);
//             })
//     );
// };

// const noAcceptedFriends = (friends) => {
//     console.log("friendsId in noAcceptedFriends", friends);
//     fetch("/setFriendship", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             operation: "noAccept",
//             other: friends,
//         }),
//     }).then((resp) =>
//         resp
//             .json()
//             .then((resp) => {
//                 console.log("res im POST", resp);
//                 if (resp.success === true) {
//                     dispatch(noAcceptedFriends(friends));
//                 }
//             })
//             .catch((err) => {
//                 console.log("err in POST /declineProspect.json", err);
//             })
//     );
// };
