import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ProfilePic from "./profilepic";
import { Uploader } from "./uploader";
import Profile from "./profile";
import FindPeople from "./findPeople";

// import ResetPassword from "./resetPassword";
// import { Link, BrowserRouter } from "react-router-dom";
//render a profile.js

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            imageUrl: "",
            officialBio: "",
        };
        // this.clickHandler = this.clickHandler.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.setBio = this.setBio.bind(this);
        this.close = this.close.bind(this);
    }
    componentDidMount() {
        console.log("app Mouted");
        fetch("/user.json")
            .then((res) => res.json())
            .then((data) => {
                console.log("setState", data);
                this.setState({
                    userId: data.userId,
                    first: data.first,
                    last: data.last,
                    imageUrl: data.url,
                    officialBio: data.bio,
                });
            });
        console.log("this setState in compnentDidMount", this.setState);
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
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
            imageUrl: newUrl,
        });
    }

    close() {
        this.setState({
            uploaderIsVisible: false,
        });
    }

    setBio(officialBio) {
        this.setState({ officialBio: officialBio });
        console.log("setBio", this.state.officialBio);
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
                <BrowserRouter>
                    <div className="menu">
                        <img src="socialNW.png" alt="logo" />
                    </div>
                    <div className="loggedcontainer">
                        <img
                            className="logo"
                            src="kazamiga-rb.png"
                            alt="logo"
                        />
                        <a
                            href="/findusers"
                            className="logo"
                            src="findPeople.png"
                            text="findusers"
                        />

                        {/* <p>Want to change your Profile Pic?</p> */}

                        <ProfilePic
                            className="imgProfile"
                            imageUrl={this.state.imageUrl}
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

                    <Profile
                        className="profileBio"
                        userId={this.state.userId}
                        first={this.state.first}
                        last={this.state.last}
                        imageUrl={this.state.imageUrl}
                        officialBio={this.state.officialBio}
                        setBio={this.setBio}
                        clickHandler={() =>
                            this.setState({
                                uploaderIsVisible: true,
                            })
                        }
                    />
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            uploadImage={this.uploadImage}
                            close={this.close}
                        />
                    )}

                    <div>
                        <a href="/findusers">find more people</a>
                        {/* <Route exact path="/" component={Profile} /> */}
                        <Route path="/findusers" component={FindPeople} />
                    </div>
                </BrowserRouter>
            </>
        );
    }
}
