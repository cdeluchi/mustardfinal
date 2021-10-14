import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import FriendshipButton from "./friendshipButton";

export default function otherProfile(props) {
    // console.log("otherProfile");
    const [user, setUser] = useState({});
    const [error, setError] = useState();
    const params = useParams();
    const { otherUserId } = useParams();
    const history = useHistory();

    useEffect(() => {
        // console.log("otherProfile just rendered", otherUserId);
        fetch(`/api/users/${otherUserId}`)
            // fetch(`/users/${otherUserId}.json`)
            .then((res) => res.json())
            .then((results) => {
                console.log("results in useEffect", results);
                if (
                    results.errorMessage ==
                    "this is the same profile, try again"
                ) {
                    history.push("/");
                } else if (results) {
                    setUser(results);
                }
            })
            .catch((err) => {
                console.log("error in OtherProfiles", err);
                setError("user is not here");
            });
        // we'll need to figure out which user profile we should show!
        // As our server should be given the otherUserId from the url in the browser

        return () => {
            console.log("cleanup function running");
        };
    }, []);
    return (
        <div className="otherProfileContainer">
            <h1>Welcome to {user.first} profile</h1>
            {user && (
                <>
                    <img className="imgInOtherProfile" src={user.url}></img>
                    <h2>
                        {user.first} {user.last}
                    </h2>
                    <h2>
                        {" "}
                        something about me: <br /> {user.bio}
                    </h2>
                </>
            )}
            {error && (
                <>
                    <p>{error}</p>
                </>
            )}
            <FriendshipButton otherUserId={otherUserId} />
        </div>
    );
}

//atob descriptura o cookie

//     useEffect(() => {
//         let abort = false;
//         console.log("otherProfile just rendered");
//         // we'll need to figure out which user profile we should show!
//         // As our server should be given the otherUserId from the url in the browser
//         console.log("user id of who we want to 👀:", otherUserId);
//         if (!abort) {
//             // we'll need to make a fetch to get the user's profile pic,
//             // their first and last name and their Bio
//             // the data we'll receive from our server needs to be put somewhere for
//             // the JSX so we'll need state, so use setUser
//             // to update our user in state so that we can render all the details!
//             // IF the user that we are requesting is ourselves we want to render
//             // the profile component instead, i.e.
//             // change the url to "/" as on that route we are rendering our profile
//             console.log("history:", history);
//             if (otherUserId == 5) { // <------ we WILL HAVE TO MAKE THIS CONDITIONAL
//                                     // dependent on our server response!
//                 history.push("/");
//             }
//             // if the user doesn't exist, we either want to send the user to
//             // their own profile
//             // OR render a conditional error msg instead.
//             // use setError to change this component state to true!
//             // and in our return, have conditional render logic
//             // that renders a 404 message that the user could not be found!
//         }

//         return () => {
//             console.log("cleanup function running");
//             abort = true;
//         };
//     }, []);
//     // useEffect(()=>{}, []);
//     return (
//         <>
//             <h1>I am another User's profile</h1>
//             <h2>
//                 I will display other people's profile pic, name & bio, but I
//                 won't give people access to edit bio or profile pic
//             </h2>
//         </>
//     );
// }
