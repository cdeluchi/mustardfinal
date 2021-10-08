import { Component } from "react";

export class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            draftbio: "",
            bioOn: true,
        };
        this.storeDraftBio = this.storeDraftBio.bind(this);
        this.openTextArea = this.openTextArea.bind(this);
        this.sendOfficialBio = this.sendOfficialBio.bind(this);
    }

    componentDidMount() {
        console.log("BIO MOUNT");
    }

    storeDraftBio({ target }) {
        console.log("storeDraftBio", target);
        this.setState(
            {
                draftBio: target.value,
            },
            () => {
                console.log("storeDraftBio", this.setState);
            }
        );
    }

    sendOfficialBio() {
        console.log("sendOfficialBio", this.state.draftbio);
        fetch("/updateBio", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((resp) => {
                if (resp.success) {
                    console.log("resp.success in fetch", resp.success);
                    this.setState((offState) => ({
                        showTextArea: !offState.showTextArea,
                        bioOn: !offState.bioOn,
                    }));
                } else {
                    this.setState({
                        error: "something went wrong",
                    });
                }
            })
            .catch((err) => console.log("error in sendOfficialBio", err));
    }

    openTextArea() {
        console.log("openTextArea");
        this.setState((offState) => ({
            showTextArea: !offState.showTextArea,
            bioOn: !offState.bioOn,
        }));
    }

    render() {
        console.log("render in bioEditor");
        return (
            <div>
                {this.state.bioOn && (
                    <div>
                        <div className="bioContainer">{this.props.bio}</div>

                        <button
                            onClick={this.openTextArea}
                            className="buttonOpnTextArea"
                        >
                            UPDATE
                        </button>
                    </div>
                )}

                {this.state.showTextArea && (
                    <div>
                        {" "}
                        <div>
                            <textarea
                                className="text-area"
                                name="text-area"
                                onChange={this.storeDraftBio}
                                placeholder={this.props.bio}
                            ></textarea>{" "}
                        </div>
                        <div>
                            <button
                                onClick={this.sendOfficialBio}
                                className="buttonEditBio"
                            >
                                SUBMIT
                            </button>{" "}
                            <button
                                onClick={this.openTextArea}
                                className="buttonEditBio"
                            >
                                CANCEL
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

// button save
//submitBio(){ fetch post request } and draftBio
// server send back to the bio

// handleBioChange
// console.log("set Bio in APP is running")
//   handleLogin(e) {
//         e.preventDefault();
//         console.log("clicked on the button login");
//         console.log("this.state in Login", this.state);
//         fetch("/login.json", {
//             method: "POST",
//             body: JSON.stringify(this.state),
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         })
