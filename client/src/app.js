import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ProfilePic from "./profilepic";
import Menu from "./menu";
import Footer from "./footer";
import { Uploader } from "./uploader";
import Profile from "./profile";
import FindPeople from "./findPeople";
import OtherProfile from "./otherProfile";
import Friends from "./friends";
import Chat from "./chat";

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
                // console.log("setState", data);
                this.setState({
                    userId: data.userId,
                    first: data.first,
                    last: data.last,
                    imageUrl: data.url,
                    officialBio: data.bio,
                });
            });
        // console.log("this setState in compnentDidMount", this.setState);
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
            // console.log("Loading in", this.state.userId);
            return <div>Loading...</div>; // or null
        }
        return (
            <>
                <BrowserRouter>
                    <div className="imgCover">
                        <img
                            className="imgCover"
                            src="/socialNW.png"
                            alt="coverProfile"
                        />
                    </div>
                    <div className="loggedcontainer">
                        <img
                            className="logo"
                            src="/kazamiga-rb.png"
                            alt="logo"
                        />
                        <Menu />
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
                        Hello {this.state.first} {this.state.last}!
                    </h2>

                    {this.state.uploaderIsVisible && (
                        <Uploader
                            uploadImage={this.uploadImage}
                            close={this.close}
                        />
                    )}

                    <div>
                        <Route path="/findusers" component={FindPeople} />
                    </div>
                    <Route exact path="/">
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
                    </Route>
                    <Route path="/users/:otherUserId">
                        <OtherProfile />
                    </Route>

                    <Route path="/friends">
                        <Friends />
                    </Route>
                    <Route path="/chat">
                        <Chat />
                    </Route>
                    <Footer />
                </BrowserRouter>
            </>
        );
    }
}

// first={this.state.first}
//                             last={this.state.last}
//                             imageUrl={this.state.imageUrl}
//                             officialBio={this.state.officialBio}
//                             setBio={this.setBio}
//                             clickHandler={() =>
//                                 this.setState({
//                                     uploaderIsVisible: true,
//                                 })
//                             }
