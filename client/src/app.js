import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
// import ProfilePic from "./profilepic";
import Menu from "./menu";
import Footer from "./footer";
// import { Uploader } from "./uploader";
// import Profile from "./profile";
import FindPeople from "./findPeople";
// import OtherProfile from "./otherProfile";
// import Friends from "./friends";
import Chat from "./chat";
import Countdown from "./countdown";
import Weather from "./weather";
import Events from "./events";
import EventsModal from "./modal";
import Map from "./map";
import Header from "./header";
// import { makeStyles } from "@mui/material";
// import { CssBaseline } from "@mui/material";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            modalEvent: false,
            modalEventClose: false,
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
    }
    componentWillUnmount() {
        console.log("componentWillUnMount");
        document.removeEventListener("mouseDown", this.modalEvent, false);
    }
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

    openModal() {
        this.setState((prevState) => ({ modalEvent: !prevState.modalEvent }));
    }
    handlerClose(e) {
        if (e.target.id === "modal") {
            this.setState({ modalEvent: false });
        }
    }
    render() {
        if (!this.state.userId) {
            // console.log("Loading in", this.state.userId);
            return <div>Loading...</div>; // or null
        }
        return (
            <>
                <BrowserRouter>
                    <div className="header">
                        <Menu />
                    </div>
                    <div className="content">
                        <Header />
                    </div>
                    <Route exact path="/"></Route>
                    <div className="containerwrap">
                        {/* <div className="eventContainer"> */}
                        <Countdown countdownTimestampMs={1659983662000} />
                        <Map />
                        <Weather />
                        <Events
                            handlerOpen={() =>
                                this.setState({
                                    modalEvent: true,
                                })
                            }
                            handlerClose={() =>
                                this.setState({
                                    modalEventClose: false,
                                })
                            }
                        />
                        {this.state.modalEvent && <EventsModal />}
                        {this.state.modalEventClose && <EventsModal />}

                        <FindPeople />
                        <Chat />
                        {/* </div> */}
                        <Footer />
                    </div>
                </BrowserRouter>
            </>
        );
    }
}
