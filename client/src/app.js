import { Component } from "react";
import ProfilePic from "./profilepic";
// import Uploader from "./uploader";
import { Link } from "react-router-dom";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.clickHandler = this.clickHandler.bind(this);
    }
    componentDidMount() {
        fetch("/user.json")
            .then((res) => res.json())
            .then((data) =>
                this.setState({
                    userid: data.userid,
                })
            );
    }

    clickHandler() {
        this.setState({ uploaderIsVisible: true });
    }

    render() {
        if (!this.state.userId) {
            console.log("Loading in", this.state.userId);
            return <div>Loading...</div>; // or null
        }
        return (
            <>
                <h1>You are logged</h1>
                <p>
                    Hola {this.state.first} {this.state.last}{" "}
                    {this.state.userId}
                </p>
                <img src="kazamiga-rb.png" alt="logo" />
                <ProfilePic
                    imageUrl={this.state.imageUrl}
                    first={this.state.first}
                    last={this.state.last}
                    clickHandler={this.clickHandler}
                />
                {/* {this.state.uploaderIsVisible && <Uploader />} */}
                <Link to="/login">
                    <button>Login</button>
                </Link>
            </>
        );
    }
}
