export default function ({ imageUrl, first, last, clickHandler }) {
    imageUrl = imageUrl || "default.jpg";
    return (
        <img src={imageUrl} alt={`${first} ${last} `} onClick={clickHandler} />
    );
}
