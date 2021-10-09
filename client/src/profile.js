import ProfilePic from "./profilepic.js";
import { BioEditor } from "./bioEditor";

export default function Profile({
    imgUrl,
    first,
    last,
    officialBio,
    setBio,
    clickHandler,
}) {
    imgUrl = imgUrl || "default.png";
    return (
        <div>
            <h2>Profile</h2>
            <h2>
                Hello {first} {last}
            </h2>
            <ProfilePic
                imgUrl={imgUrl}
                first={first}
                last={last}
                clickHandler={clickHandler}
            />
            <BioEditor officialBio={officialBio} setBio={setBio} />
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
