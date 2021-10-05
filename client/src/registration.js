import { Component } from "react";

export class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: "Something went wrong, try again",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }
    componentDidMount() {
        console.log("componentDidMount");
    }
    handleChange({ target }) {
        console.log("Changed in Input field");
        // console.log("target", target.name);
        // console.log("target", target.value);
        this.setState(
            {
                [target.name]: target.value,
            },
            () => console.log("registration StateUpdate", this.state)
        );
    }

    handleRegister(e) {
        e.preventDefault();
        console.log("clicked on the button");
        console.log("this.state", this.state);
        fetch("/registration.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        }).then((resp) =>
            resp
                .json()
                .then((resp) => {
                    console.log("POST /registrations.json:", resp);
                })
                .catch((err) => {
                    console.log("err in POST /registration.json", err);
                })
        );
    }

    render() {
        return (
            <section>
                <h2>Be part:</h2>
                <form>
                    <input
                        type="text"
                        name="first"
                        placeholder="first name"
                        onChange={this.handleChange}
                    ></input>
                    <input
                        type="text"
                        name="last"
                        placeholder="last name"
                        onChange={this.handleChange}
                    ></input>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        onChange={this.handleChange}
                    ></input>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={this.handleChange}
                    ></input>
                    {this.state.error && (
                        <h2 className="h2InError">{this.state.error}</h2>
                    )}
                    <button onClick={this.handleRegister}>Register</button>
                </form>
                <h2>
                    Already a member?
                    <a href="/">Log In</a>
                </h2>
            </section>
        );
    }
}
