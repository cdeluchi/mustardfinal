import React from "react";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitCode = this.submitCode.bind(this);
        this.submitEmail = this.submitEmail.bind(this);
    }

    componentDidMount() {
        console.log("componentDidMount");
    }
    handleChange({ target }) {
        console.log("Changed in Input field Registration");
        // console.log("target", target.name);
        // console.log("target", target.value);
        this.setState(
            {
                [target.name]: target.value,
            },
            () => console.log("registration StateUpdate", this.state)
        );
    }

    submitCode(e) {
        e.preventDefault();
        console.log("submitCode");
        fetch("/resetCode", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((resp) =>
            resp.json().then((resp) => {
                console.log("POST /registrations.json:", resp);
                if (!resp.success) {
                    this.setState({
                        error: "Something went wrong!",
                    });
                } else {
                    this.setState({
                        step: 2,
                    });
                }
            })
        );
    }

    submitEmail(e) {
        e.preventDefault();
        console.log("Step2", this.state);
        fetch("/resetPassword", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((resp) =>
            resp.json().then((resp) => {
                console.log("ressetPassword:", resp);
                if (!resp.success) {
                    console.log("try again in", resp.success);
                    this.setState({
                        error: "Something went wrong!",
                    });
                } else {
                    this.setState({
                        step: 3,
                    });
                }
            })
        );
    }
    render() {
        let elem = this.state.step;
        if (elem == 1) {
            elem = (
                <section>
                    <h2>resset Password</h2>
                    <h2>
                        Please enter the email address with which you registered
                    </h2>
                    <form>
                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            onChange={this.handleChange}
                            required
                        ></input>
                        {this.state.error && (
                            <h2 className="h2InError">{this.state.error}</h2>
                        )}
                        <button onClick={this.submitCode}>Submit</button>
                    </form>
                </section>
            );
        } else if (elem == 2) {
            elem = (
                <section>
                    <h2>resset Password</h2>
                    <h2>Please enter the code</h2>
                    <form>
                        <input
                            type="text"
                            name="code"
                            placeholder="code"
                            onChange={this.handleChange}
                            required
                        ></input>
                        <h2>Please enter the new password</h2>
                        <input
                            type="password"
                            name="password"
                            placeholder="new password"
                            onChange={this.handleChange}
                            required
                        ></input>
                        {this.state.error && (
                            <h2 className="h2InError">{this.state.error}</h2>
                        )}
                        <button onClick={this.submitCode}>Submit</button>
                    </form>
                </section>
            );
        }
        return elem;
    }
    // return (
    //     <div>
    //         {step == 1 && (
    //             <div>
    //                 <input name="email" onChange={e => this.handleChange(e)} />
    //             </div>
    //         )}
    //         {step == 2 && (
    //             <div>
    //                 <input name="code" />
    //                 <input name="password" />
    //             </div>
    //         )}
    //     </div>
    // );
}

// *** CHECK IF IS WE PUT HERE THE SUCCESS MENSAGE
