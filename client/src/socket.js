import { io } from "socket.io-client";

import { useDispatch } from "react-redux";
import { latestTenMsgs, chatMessage } from "./redux/messages/slice";

export let socket;
// const dispatch = useDispatch();

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }

    socket.on("latestTenMsgs", (message) => {
        console.log("latestTenMsgs", message);
        store.dispatch(latestTenMsgs(message));
    });
    socket.on("newMsg", (message) => {
        console.log("newMsg: ", message);
        store.dispatch(chatMessage(message));
    });
};

// Encounter
// export const init = (store) => {
//     if (!socket) {
//         socket = io.connect();

//         // socket.on("latestTenMessages", (msgs) =>
//         //     store.dispatch(chatMessagesReceived(msgs))
//         // );

//         // socket.on("chatMessage", (msg) =>
//         //     store.dispatch(chatMessageReceived(msg))
//         // );

//         socket.on("addChatMsg", (msg) => {
//             console.log(`Got a message in the client!! I'm about to start the whoooole Redux process by dispatching in here!!

//             My message is ${msg}`);

//             // this is where you should dispatch an action to put this message in redux
//         });
//     }
// };
