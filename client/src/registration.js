import { Component } from "react";
import { Link } from "react-router-dom";

export class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
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

    handleRegister(e) {
        e.preventDefault();
        // console.log("clicked on the button");
        // console.log("this.state", this.state);
        fetch("/registration.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((resp) => {
                console.log("POST /registrations.json:", resp);
                if (!resp.success) {
                    console.log("POST /login.json:", resp);
                    this.setState({ error: "try again!" });
                } else {
                    location.reload();
                    console.log("else in handleLogin");
                }
            })
            .catch((err) =>
                console.log("error in catch-post-registration", err)
            );
    }

    render() {
        return (
            <section className="bodyinregistration">
                <h2>Be part:</h2>
                <div>
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
                        <button onClick={this.handleRegister}>Register</button>
                        <Link to="/login">
                            <button>Login</button>
                        </Link>
                    </form>
                </div>
            </section>
        );
    }
}
