// import Menu from "./menu";
// import ProfilePic from "./profilepic";
import { useEffect, useState } from "react";

// Import useDispatch and useSelector from react-redux,
// the actions you are going to dispatch from your slice.js,
//and useEffect from react.

import { useDispatch, useSelector } from "react-redux";
import { makeFriends, noFriends } from "./redux/users/slice";

// Must export a function component because we want to use the
// useDispatch and useSelector hooks

export default function Friends(data) {
    console.log("default Function in Friends", data);
    // const alreadyFriends = useSelector(
    //     (state) => state.friends && state.friends.filter((users) => friends.hot)
    // );
    const dispatch = useDispatch();
    const friends = useSelector(
        (state) =>
            state.friends &&
            state.friends.filter((friends) => friends.accepted == true)
    );

    const wannaBe = useSelector(
        (state) =>
            state.friends &&
            state.friends.filter((friends) => friends.accepted == false)
    );

    useEffect(() => {
        console.log("useEffect");

        fetch("/friends.json")
            .then((res) => res.json())
            .then((data) => {
                console.log("useEffect data in Friends.json", data);
                dispatch(makeFriends(data));
            });
    }, []);

    const acceptedFriends = (friendsId) => {
        console.log("friendsId in acceptedFriends", friendsId);
        fetch("/setFriendship", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                operation: "accept",
                other: friendsId,
            }),
        })
            .then((resp) => {
                if (resp.success === true) {
                    dispatch(acceptedFriends(friendsId));
                }
            })
            .catch((err) => {
                console.log("err in POST acceptFriendship", err);
            });
    };

    const noAcceptedFriends = (friendsId) => {
        console.log("friendsId in noAcceptedFriends", friendsId);
        fetch("/setFriendship", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                operation: "noAccept",
                other: friendsId,
            }),
        })
            .then((resp) => {
                if (resp.success === true) {
                    dispatch(noAcceptedFriends(friendsId));
                }
            })
            .catch((err) => {
                console.log("err in POST noAcceptFriendship", err);
            });
    };
    return (
        <>
            <div className="friendsWannabeContainer">
                <h1>Mais que amigos, Friends</h1>
                <div id="myFriends">
                    <p>My Friends:</p>
                    {friends &&
                        friends.map((friends, i) => (
                            <p key={i}>
                                <img
                                    className="profilePicSmall"
                                    src={friends.imgurl}
                                    alt="myFriend"
                                />
                                {friends.first}
                                {friends.last}
                                <button
                                    onClick={() => acceptedFriends(friends.id)}
                                >
                                    cancel
                                </button>
                            </p>
                        ))}
                </div>

                <div id="noFriends">
                    <p>This is who want to be your friends:</p>
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
                                        noAcceptedFriends(wannaBe.id)
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
