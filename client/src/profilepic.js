export default function ({ imageUrl, first, last, clickHandler }) {
    imageUrl = imageUrl || "defaultpic.png";
    return (
        <img
            className="imgUploader"
            src={imageUrl}
            alt={`${first} ${last} `}
            onClick={clickHandler}
        />
    );
}
