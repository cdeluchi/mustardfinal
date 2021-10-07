import React from "react";
import ProfilePic form "./profilepic.js"

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        fetch("/user.json"())
            .then((res) => res.json())
            .then((data) => this.setState(data));
    }
    render() {
        if (!this.state.userId) {
            return null; // or <div>Loading...</div>
        }
        return (
            <>
                <img sr="logo.png" alt="logo" />
                <ProfilePic
                    imageUrl={this.state.imageUrl}
                    first={this.state.first}
                    last={this.state.last}
                />
                {this.state.uploaderIsVisible && (
                    <Uploader/>
                )}
                
            </>
        );
    }
}
