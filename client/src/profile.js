import ProfilePic from "./profilepic.js";
import { BioEditor } from "./bioEditor";
import { Link } from "react-router-dom";

export default function Profile({
    imageUrl,
    first,
    last,
    officialBio,
    setBio,
    clickHandler,
}) {
    imageUrl = imageUrl || "default.png";
    return (
        <div>
            <ProfilePic
                imageUrl={imageUrl}
                first={first}
                last={last}
                clickHandler={clickHandler}
            />
            <div>
                <BioEditor officialBio={officialBio} setBio={setBio} />
            </div>
        </div>
    );
}

// export default function Profile(props) {
//     return (
//         <div>
//             <h1>This is a profile!</h1>
//             <ProfilePic />
//         </div>
//     );
// }
