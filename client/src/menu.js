import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <div id="menu">
            <div className="menuHome">
                <Link to="/">Home</Link>
            </div>
            <div className="menuUsers">
                <Link to="/findusers">Find People</Link>
            </div>
            <div className="menufriends">
                <Link to="/friends">Friends</Link>
            </div>
            <div className="menulogout">
                <a href="/logout">Logout</a>
            </div>
        </div>
    );
}
