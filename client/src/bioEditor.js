import { Component } from "react";

export class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTextArea: false,
            editTextArea: false,
            draftbio: "",
        };
        this.handleChange = this.handleChange.bind(this);
        // this.storeDraftBio = this.storeDraftBio.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShowBio = this.handleShowBio.bind(this);
        // this.handleEditBio = this.handleEditBio.bind(this);
        // this.openTextArea = this.openTextArea.bind(this);
        // this.sendOfficialBio = this.sendOfficialBio.bind(this);
    }

    componentDidMount() {
        console.log("BIO MOUNT");
        if (this.props.officialBio != null) {
            this.setState({ showTextArea: true });
        }
    }

    handleShowBio() {
        this.setState({
            showTextArea: true,
        });
    }

    handleChange({ target }) {
        this.setState({ draftBio: target.value });
        console.log("this.state in handleChange", this.state.draftBio);
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch("./bio.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.bioUpdate) {
                    console.log("result in bioUpdate", result);
                    this.setState({
                        editTextArea: false,
                        officialBio: result.officialBio,
                    });
                    this.props.setBio(this.state.draftBio);
                } else {
                    this.setState({
                        error: "error in bioUpdate",
                    });
                }
            })
            .catch((err) => console.log("error in bioUpdate", err));
    }

    render() {
        // let elem = this.state.step;
        //         if (elem == 1) {
        console.log("render in bioEditor");

        return (
            <>
                <div>
                    {this.state.officialBio && (
                        <div>
                            <div className="bioContainer">
                                {this.props.officialBio}
                            </div>

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
                                    onChange={this.draftBio}
                                    placeholder={this.props.officialBio}
                                ></textarea>{" "}
                            </div>
                            <div>
                                <button
                                    onClick={this.officialBio}
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
            </>
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

// mesmo principio do RESETPASSWROD

// render() {
//         let elem = this.state.step;
//         if (elem == 1) {
//             elem = (
//                 <section>
//                     <h2>resset Password</h2>
//                     <h2>
//                         Please enter the email address with which you registered
//                     </h2>
//                     <form>
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="email"
//                             onChange={this.handleChange}
//                             required
//                         ></input>
//                         {this.state.error && (
//                             <h2 className="h2InError">{this.state.error}</h2>
//                         )}
//                         <button onClick={this.submitCode}>Submit</button>
//                     </form>
//                 </section>
//             );
//         } else if (elem == 2) {
