import { Component } from "react";
import ProfilePic from "./profilepic";
import { Uploader } from "./uploader";
// import ResetPassword from "./resetPassword";
// import { Link } from "react-router-dom";
//render a profile.js

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            officialBio: "",
        };
        this.clickHandler = this.clickHandler.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        // this.setBio = this.setBio.bind(this);
    }
    componentDidMount() {
        fetch("/user.json")
            .then((res) => res.json())
            .then((data) => {
                console.log("data fetch in app", data);
                if (data.bio) {
                    this.setState(data);
                } else {
                    this.setState(data);
                    this.setState({
                        bio: `say somthing about myself?`,
                    });
                }
                this.setState({
                    userId: data.userId,
                    first: data.first,
                    last: data.last,
                });
            });
        console.log("this setstate in compnentDidMount", this.setState);
    }

    uploadImage(newUrl) {
        console.log("uploadImage is runnig");
        this.setState((defaultPic) => ({
            uploaderIsVisible: !defaultPic.uploadImage,
            imageUrl: newUrl,
        }));
    }

    clickHandler() {
        this.setState({ uploaderIsVisible: false });
    }

    // imageUrl() {
    //     this.setState({
    //         imageUrl: newUrl,
    //         uploaderIsVisible: false,
    //     });
    // }

    // setBio(officialBio) {
    //     console.log("userBio in App is running");
    //     this.setState({});
    // }

    render() {
        if (!this.state.userId) {
            console.log("Loading in", this.state.userId);
            return <div>Loading...</div>; // or null
        }
        return (
            <>
                <div className="loggedcontainer">
                    <h1>You are logged</h1>
                    <p>
                        Hola {this.state.first} {this.state.last}{" "}
                    </p>
                    <img className="logo" src="kazamiga-rb.png" alt="logo" />
                    <ProfilePic
                        imageUrl={this.state.imageUrl}
                        first={this.state.first}
                        last={this.state.last}
                        userId={this.state.userId}
                        bio={this.state.bio}
                        officialBio={this.state.officialBio}
                        setBio={this.state.setBio}
                        clickHandler={() =>
                            this.setState({
                                uploaderIsVisible: true,
                            })
                        }
                    />
                </div>
                <div className="profilePicContainer">
                    bio={this.state.bio}
                    className={this.state.defaultPic}, first={this.state.first}{" "}
                    last={this.state.last} setBio={this.state.setBio}{" "}
                    clickHandler=
                    {() => {
                        this.setState((defaultPic) => ({
                            uploaderIsVisible: !defaultPic.uploaderIsVisible,
                        }));
                    }}
                </div>

                {this.state.uploaderIsVisible && (
                    <Uploader
                        imageUrl={this.imageUrl}
                        uploadImage={this.uploadImage}
                        closeButton={this.closeButton}
                    />
                )}
                <button onClick={this.clickHandler}>close</button>
            </>
        );
    }
}
