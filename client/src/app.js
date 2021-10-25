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
import Events from "./events";
import Map from "./map";
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
                            <br />
                            Meditation on Twin Hearts
                        </h2>
                        <p>
                            Meditation on Twin Hearts is a simple yet powerful
                            technique introduced by Master Choa Kok Sui for
                            achieving cosmic consciousness or what we often call
                            “illumination.” It is also a form of service to the
                            world by increasing harmony and peace through
                            becoming a channel to bless the earth with
                            loving-kindness. In fact among all the techniques
                            taught by Master Choa Kok Sui, perhaps none prompts
                            as many glowing testimonials of personal healing and
                            positive life transformation as the Meditation on
                            Twin Hearts.
                            <br />
                            <br />
                            Meditation on Twin Hearts is designed based on the
                            principle that some of the major chakras such as the
                            crown chakra are the entry points or gateways to
                            certain levels of consciousness. Therefore to
                            achieve illumination the crown chakra should be
                            sufficiently activated. The crown chakra can only be
                            activated when the heart chakra is first
                            sufficiently activated.
                            <br />
                            <br />
                            There are many ways of activating the heart and
                            crown chakras, such as Hatha yoga, yogic breathing
                            techniques, chanting mantras and visualization
                            techniques. All of these techniques are effective
                            but not fast enough. One of the most effective and
                            fastest ways to activate these chakras is through
                            the Meditation on Twin Hearts. It basically helps to
                            transform the internal condition of the
                            practitioner. When during meditation we transform
                            despair into hope, doubt into faith and darkness
                            into light, we will be filled internally with hope,
                            faith and light. This in fact creates a healing and
                            transforming effect.
                        </p>
                    </div>
                    <div className="containerwrap">
                        <Route exact path="/"></Route>

                        <Countdown countdownTimestampMs={1659983662000} />
                        <Map />
                        <Weather />
                        <Events />
                        <div className="socialcontainer">
                            <FindPeople />
                            {/* <Friends /> */}
                            <Chat />
                        </div>
                        <Footer />
                    </div>
                </BrowserRouter>
            </>
        );
    }
}
