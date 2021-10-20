// import ProfilePic from "./profilepic";
import { useEffect } from "react";

// Import useDispatch and useSelector from react-redux,
// the actions you are going to dispatch from your slice.js,
//and useEffect from react.
import { useDispatch, useSelector } from "react-redux";
import {
    acceptedFriendship,
    addFriends,
    unfriendship,
} from "./redux/users/slice";

// Must export a function component because we want to use the
// useDispatch and useSelector hooks
//need to use dispatch to do this
// const dispatch = useDispatch()
// need useSelector ***

export default function Friends({ imgurl, first, last, clickHandler }) {
    console.log("default Function in Friends");

    const dispatch = useDispatch();

    const myFriends = useSelector(
        (state) =>
            state.data && state.data.filter((data) => data.accepted == true)
    );
    // console.log("myFriends", data.rows);
    console.log("Friends", myFriends);
    const wannaBe = useSelector(
        (state) =>
            state.data && state.data.filter((data) => data.accepted == false)
    );

    useEffect(() => {
        console.log("useEffect");
        fetch("/friends.json")
            .then((res) => res.json())
            .then((res) => {
                console.log("useEffect data in Friends.json", res);
                dispatch(addFriends(res.rows));
            });
    }, []);

    const handleAccFriendship = (id) => {
        fetch("/acceptedFriend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                operation: "accept",
                other: id,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log("res is handleAccFriendship", res);
                if (res.success) {
                    dispatch(acceptedFriendship(id));
                }
            })
            .catch((err) => {
                console.log("err in POST /acceptedFriend", err);
            });
    };

    const handleNoFriendship = (id) => {
        fetch("/unfriend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                operation: "cancel",
                other: id,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success === true) {
                    dispatch(unfriendship(id));
                }
            })
            .catch((err) => {
                console.log("error in post cancel friendship", err);
            });
    };

    return (
        <>
            {/* <div className="friendsandWannabecontainer"> */}
            <h1>Mais que amigos, Friends</h1>

            {/* <ProfilePic
                        className="profilePic"
                        imageUrl={imgurl}
                        first={first}
                        last={last}
                        clickHandler={clickHandler}
                    /> */}
            <p>My Friends:</p>
            <div myFriendsContainer>
                {myFriends &&
                    myFriends.map((data, i) => (
                        <p key={i}>
                            <img
                                className="profilePic"
                                src={data.imgurl}
                                alt="myFriend"
                            />
                            {data.first}
                            {data.last}
                            <button
                                onClick={() =>
                                    handleAccFriendship(myFriends.id)
                                }
                            >
                                Unfriend
                            </button>
                        </p>
                    ))}
            </div>

            <p>They want to be my friends:</p>
            <div className="wannaBeContainer">
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
                                onClick={() => handleAccFriendship(wannaBe.id)}
                            >
                                accept
                            </button>
                            <button
                                onClick={() => handleNoFriendship(wannaBe.id)}
                            >
                                cancel
                            </button>
                        </p>
                    ))}
            </div>
            {/* </div> */}
        </>
    );
}
