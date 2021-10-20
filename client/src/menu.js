export default function Menu() {
    return (
        <div id="menu">
            <div className="menuHome">
                <a href="/">
                    <img alt="home" src="/home.png" />
                </a>
                {/* <Link to="/">Home</Link> */}
            </div>
            <div className="menuUsers">
                {/* <Link to="/findusers">Find People</Link> */}
                <a href="/findusers">
                    <img alt="findPeople" src="/findPeople.png" />
                </a>
            </div>
            <div className="menufriends">
                {/* <Link to="/friends">Friends</Link> */}
                <a href="/friends">
                    <img alt="myFriends" src="/myFriends.png" />
                </a>
            </div>
            <div className="menufriends">
                {/* <Link to="/friends">Friends</Link> */}
                <a href="/chat">
                    <img alt="myChat" src="/chat.png" />
                </a>
            </div>
            <div className="menulogout">
                <a href="/logout">
                    <img alt="logout" src="/logout.png" />
                </a>
            </div>
        </div>
    );
}
