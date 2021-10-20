import { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

// ******add this component in reducer too****

export default function Chat() {
    const elemRef = useRef();
    const messages = useSelector((state) => state.messages);
    // console.log("chat component", messages);

    useEffect(() => {
        console.log("chat hooks component has MOUNTED");
        console.log("elem Ref is ==> ", elemRef);

        console.log("scroll top: ", elemRef.current.scrollTop);
        console.log("clientHeight: ", elemRef.current.clientHeight);
        console.log("scrollHeight: ", elemRef.current.scrollHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [messages]);

    // ****use Async if we want...***
    // const keyCheck = (e) => {
    //     if (e.key === "Enter") {
    //         e.preventDefault(); // this will prevent going to the next line
    //         socket.emit("my new chat message", e.target.value);
    //         e.target.value = ""; // clears input field after we click enter
    //     }
    // };

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
            <h2>Welcome to Chat</h2>
            <div className="chatcontainer" ref={elemRef}>
                {messages?.map((message, i) => {
                    return <p key={i}>{message.messages}</p>;
                })}
            </div>
            <textarea
                className="textAreaInChat"
                onKeyDown={keyCheck}
                placeholder="add your message here"
            ></textarea>
        </>
    );
}
