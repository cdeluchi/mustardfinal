import React from "react";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import { Link } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.clickHandler = this.clickHandler.bind(this);
    }
    componentDidMount() {
        fetch("/user.json"())
            .then((res) => res.json())
            .then((data) =>
                this.setState({
                    userId: data.userId,
                    first: data.first,
                    last: data.last,
                })
            );
    }

    clickHandler() {
        this.setState({ uploaderIsVisible: true });
    }

    render() {
        if (!this.state.userId) {
            return null; // or <div>Loading...</div>
        }
        return (
            <>
                <h1>You are logged</h1>
                <p>
                    Hola {this.state.first} {this.state.last}{" "}
                    {this.state.userId}
                </p>
                <img sr="logo.png" alt="logo" />
                <ProfilePic
                    imageUrl={this.state.imageUrl}
                    first={this.state.first}
                    last={this.state.last}
                    clickHandler={this..clickHandler}
                />
                {this.state.uploaderIsVisible && <Uploader />}
            </>
        );
    }
}
