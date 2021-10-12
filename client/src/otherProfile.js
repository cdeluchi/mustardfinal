import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";

export default function otherProfile() {
    const [user, setUser] = useState({});
    const params = useParams();
    const { otherUserId } = useParams();
    const history = useHistory();
    useEffect(() => {
        let abort = false;
        console.log("otherProfile just rendered");
        // we'll need to figure out which user profile we should show!
        // As our server should be given the otherUserId from the url in the browser
        if (!abort) {
            console.log("otherusersProfile");
            fetch(`users/${otherUserId}`)
                .then((res) => res.json())
                .then((data) => setUser(data));
        }
        return () => {
            console.log("cleanup function running ");
            abort = true;
        };
    }, []);
    return (
        <>
            <h1>Other Profile</h1>
            <img src={user.url} alt={user.id} />
            <p>{user.first}</p>
            <p>{user.last}</p>
            <p>{user.userId}</p>
            <p>{user.bio}</p>
        </>
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
