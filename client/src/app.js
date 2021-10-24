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
import Countdown from "./countdown";
import Weather from "./weather";
// import Map from "./map";
// import { makeStyles } from "@mui/material";
// import { CssBaseline } from "@mui/material";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         minHeight: "100vh",
//         backgroundImage: `url(${process.env.public + "/socialNW"})`,
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//     },
// }));
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
                        <h2>
                            {/* Hello {this.state.first} {this.state.last} */}
                            <br />
                            Welcome to NamasGO
                        </h2>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum Lorem Ipsum is simply dummy text of the
                            printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since
                            the 1500s, when an unknown printer took a galley of
                            type and scrambled it to make a type specimen book.
                            It has survived not only five centuries, but also
                            the leap into electronic typesetting, remaining
                            essentially unchanged. It was popularised in the
                            1960s with the release of Letraset sheets containing
                            Lorem Ipsum passages, and more recently with desktop
                            publishing software like Aldus PageMaker including
                            versions of Lorem Ipsum
                            <br />
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum Lorem Ipsum is simply dummy text of the
                            printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since
                            the 1500s, when an unknown printer took a galley of
                            type and scrambled it to make a type specimen book.
                            It has survived not only five centuries, but also
                            the leap into electronic typesetting, remaining
                            essentially unchanged. It was popularised in the
                            1960s with the release of Letraset sheets containing
                            Lorem Ipsum passages, and more recently with desktop
                            publishing software like Aldus PageMaker including
                            versions of Lorem Ipsum
                        </p>
                    </div>
                    <div className="containerwrap">
                        <Route exact path="/"></Route>

                        <Countdown countdownTimestampMs={1659983662000} />
                        {/* <Map /> */}

                        <Weather />
                        <FindPeople />
                        {/* <Friends /> */}
                        <Chat />
                        <Footer />
                    </div>
                </BrowserRouter>
            </>
        );
    }
}
