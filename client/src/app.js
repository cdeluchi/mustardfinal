import { Component } from "react";
import ProfilePic from "./profilepic";
import { Uploader } from "./uploader";
// import Profile from "./profile";
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
        this.setBio = this.setBio.bind(this);
        this.close = this.close.bind(this);
    }
    componentDidMount() {
        fetch("/user.json")
            .then((res) => res.json())
            .then((data) =>
                this.setState({
                    userId: data.userId,
                    first: data.first,
                    last: data.last,
                    imageUrl: data.url,
                    officialBio: data.bio,
                })
            );
        console.log("this setstate in compnentDidMount", this.setState);
    }

    // New Image
    newImg(newUrl) {
        this.setState({
            imageUrl: newUrl,
            uploaderIsVisible: false,
        });
    }
    // Upload Image
    uploadImage(newUrl) {
        console.log("uploadImage is runnig");
        this.setState((defaultPic) => ({
            uploaderIsVisible: !defaultPic.uploadImage,
            imageUrl: newUrl,
        }));
    }

    // button click and close
    clickHandler() {
        this.setState({ uploaderIsVisible: false });
    }
    close() {
        this.setState({
            uploaderIsVisible: false,
        });
    }
    // setBio(officialBio) {
    //     console.log("userBio in App is running");
    //     this.setState({});
    // }

    setBio(officialBio) {
        this.setState({ officialBio: officialBio });
    }
    // imageUrl() {
    //     this.setState({
    //         imageUrl: newUrl,
    //         uploaderIsVisible: false,
    //     });
    // }

    render() {
        if (!this.state.userId) {
            console.log("Loading in", this.state.userId);
            return <div>Loading...</div>; // or null
        }
        return (
            <>
                <img src="socialNW.png" alt="logo" />

                <div className="loggedcontainer">
                    <img className="logo" src="kazamiga-rb.png" alt="logo" />
                    {/* <p>Want to change your Profile Pic?</p> */}
                    <ProfilePic
                        className="imgProfile"
                        imgUrl={this.state.imgUrl}
                        first={this.state.first}
                        last={this.state.last}
                        clickHandler={() =>
                            this.setState({
                                uploaderIsVisible: true,
                            })
                        }
                    />
                </div>
                <h2>
                    Hello {this.state.first} {this.state.last} grab a cup of
                    coffee and tell me somenthing nice
                </h2>

                {/* <Profile
                    first={this.state.first}
                    last={this.state.last}
                    userId={this.state.userId}
                    imageUrl={this.state.imageUrl}
                    officialBio={this.state.officialBio}
                    setBio={this.setBio}
                    clickHandler={() =>
                        this.setState({
                            uploaderIsVisible: true,
                        })
                    }
                /> */}
                {this.state.uploaderIsVisible && (
                    <Uploader
                        imageUrl={this.imageUrl}
                        uploadImage={this.uploadImage}
                        closeButton={this.closeButton}
                    />
                )}
            </>
        );
    }
}
