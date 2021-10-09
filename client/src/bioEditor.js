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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShowBio = this.handleShowBio.bind(this);
        this.handleEditBio = this.handleEditBio.bind(this);
        this.storeDraftBio = this.storeDraftBio.bind(this);
        this.openTextArea = this.openTextArea.bind(this);
        this.sendOfficialBio = this.sendOfficialBio.bind(this);
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
