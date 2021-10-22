import { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// ******add this component in reducer too****

export default function Chat() {
    const elemRef = useRef();
    const messages = useSelector((state) => state.messages);
    console.log("chat component", messages);

    useEffect(() => {
        console.log("chat hooks component has MOUNTED");
        console.log("elem Ref is ==> ", elemRef);
        // console.log("scroll top: ", elemRef.current.scrollTop);
        // console.log("clientHeight: ", elemRef.current.clientHeight);
        // console.log("scrollHeight: ", elemRef.current.scrollHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [messages]);

    // ****use Async if we want...***
    const keyCheck = async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("chatMessage", e.target.value);
            console.log("our message is: ", e.target.value);
            e.target.value = "";
        }
    };
    return (
        <>
            <h2>Welcome to the Chat</h2>
            <div className=" chatcontainer " ref={elemRef}>
                {messages &&
                    messages.map((messages, i) => (
                        <p key={i}>
                            <img
                                className="profilePicInChat"
                                src={messages.imgurl}
                                alt="onlineChat"
                            />
                            {messages.first}
                            {messages.last}
                            <br />
                            message: {messages.message}
                        </p>
                    ))}
            </div>
            <textarea
                className="textAreaInChat"
                onKeyDown={keyCheck}
                placeholder="add your message here"
            ></textarea>
        </>
    );
}
