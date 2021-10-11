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
        // this.handleEditBio = this.handleEditBio.bind(this)
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
        console.log("handleSubmit", this.state.draftBio);
        fetch("/bio.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.bioUpdate) {
                    this.setState({
                        editTextArea: false,
                        officialBio: result.officialBio,
                    });
                    this.props.setBio(this.state.draftBio);
                } else {
                    this.setState({
                        error: "bio update failed",
                    });
                }
            })
            .catch((err) => console.log("error in bio update", err));
    }

    render() {
        // let elem = this.state.step;
        //         if (elem == 1) {
        console.log("render in bioEditor");
        let elem;
        if (
            this.state.showTextArea === true &&
            this.state.editTextArea === false
        ) {
            elem = (
                //button to EditBio
                <>
                    <p>{this.props.officialBio}</p>
                    <button onClick={this.handleEditBio}>edit bio</button>
                </>
            );
        } else if (
            this.state.showTextArea === true &&
            this.state.editTextArea === true
        ) {
            // create a new argument to receive all the info from props officialBio ""
            let newval = this.props.officialBio || "";
            elem = (
                <>
                    <textarea
                        value={newval}
                        onChange={this.handleChange}
                    ></textarea>
                    <button onClick={this.handleSubmit}>save bio</button>
                </>
            );
        } else {
            elem = <a onClick={this.handleShowBio}>add bio</a>;
        }
        return (
            <>
                <div className="bioEditor">
                    <p>Bio Editor</p>
                    {elem}
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
