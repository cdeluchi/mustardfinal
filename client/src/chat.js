import { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

// add this component in reducer too

export default function chat() {
    const chatMessages = useSelector((state) => state && state.chatMessages);
    console.log("chatMsg", chatMessages);

    const keyCheck = (e) => {
        console.log("chatmsg");

        if (e.key === "Enter") {
            e.preventDefaut();
            console.log("our mgs ===", e.target.value);
            socket.emit("my new chat message", e.target.value);
            e.target.value = "";
        }
    };
    return (
        <div className="chatcontainer">
            <p>Welcome to my chat</p>
            <div className="msgcontainer">
                <p>chat messages will be here</p>
                <p>chat messages will be here</p>
                <p>chat messages will be here</p>
                <p>chat messages will be here</p>
                <p>chat messages will be here</p>
                <p>chat messages will be here</p>
                <p>chat messages will be here</p>
                <p>chat messages will be here</p>
                <p>chat messages will be here</p>
                <p>chat messages will be here</p>
            </div>
            <textarea
                placeholder="add your msg"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
