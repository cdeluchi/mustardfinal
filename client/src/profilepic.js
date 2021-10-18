// import { BioEditor } from "./bioEditor";
export default function ({ imageUrl, first, last, clickHandler }) {
    // console.log("Imageurl", imageUrl);

    imageUrl = imageUrl || "defaultpic.png";
    // console.log("Imageurl", imageUrl);

    return (
        <div className="profilePic">
            <img
                src={imageUrl}
                alt={`${first} ${last} `}
                onClick={clickHandler}
            />
            {/* <BioEditor /> */}
        </div>
    );
}
