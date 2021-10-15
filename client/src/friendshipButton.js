// RENDER IN APP COMPONENT
// DECIDIR SE A MENSAGEM DO BUTTON VAI SER NO SERVER SIDE OU NO CLIENT SIDE
// NAO PRECISA FAZER NOS 2 CASOS
// QUEM ESTA MANDANDO O REQUEST ´E QUEM ESTA CLICANDO NO BOTAO
// QUANDO OS BOTOES SAO CLICADOS ELES DEVEM MUDAR O TEXTO QUE ESTA MOSTRANDO ALI
// O ID SERA PEGO DO COOKIE EDEVE SER ARMAZENADO EM UM A ARRAY VAZIA

import { useState, useEffect } from "react";

export default function FriendshipButton({ otherUserId }) {
    console.log(" function FriendButton running");
    const [buttonText, setButtonText] = useState("");
    // const [error, setError] = useState();

    useEffect(() => {
        // console.log("FriendButton just rended");
        // console.log("FriendButton just rended", useState);

        // let abort = false;

        console.log("otherUserId: ", otherUserId);
        fetch(`/getfriendship/${otherUserId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("results in FriendButton", data);
                if (!data.length) {
                    setButtonText("add Friend");
                } else if (
                    data ||
                    (!data.accepted && data.recipient_id == otherUserId)
                ) {
                    setButtonText("cancel Friend");
                } else if (
                    !data.accepted.length &&
                    data.sender_id.length == otherUserId
                ) {
                    setButtonText("accepted Friend");
                } else if (data.accepted.length) {
                    setButtonText("ended Friend");
                }
            })
            .catch((err) => {
                console.log("error in FriendButton", err);
            });
        return () => {
            console.log("cleanup function running");
            // abort = true;
        };
    }, []);

    const clickBtn = () => {
        fetch("/setFriendship", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                buttonText: buttonText,
                otherUserId: otherUserId,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setButtonText(data.buttonText); //o botão deve ser alterado toda vez que o post request for alterado
            })
            .catch(console.log);
    };

    return (
        <>
            <button onClick={clickBtn}> {buttonText}</button>
        </>
    );
}
// needs to be passed the id of the user whose profile the btn appears on
// as we need to go ask our server whether we the user who is logged in
// wants ot befriend/cancel/end friendship!

// in UseEffect we will make a fetch request to the server to find out
// the two user's relationship status
// depending on the servers response we'll set the btn text value

//on btn click we want to update the relationship between our users
// so we'll need to run a fetch POST communicating to the server to update
// the relationship between user logged in, and user whose profile the btn is on
// as a result when the DB is updated, the btn text should reflect this new status by changin its text
