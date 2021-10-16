import { Link } from "react-router-dom";
import { Component } from "react";
// import { BrowserRouter, Route } from "react-router-dom";

export class Login extends Component {
    //constructor
    constructor(props) {
        super(props);
        this.state = {
            error: "Something went wrong",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        console.log("LOGIN MOUNTED");
        this.setState({
            error: false,
        });
    }

    //handleChange
    handleChange({ target }) {
        console.log("Changed in Input field Login");
        // console.log("target", target.name);
        // console.log("target", target.value);
        this.setState(
            {
                [target.name]: target.value,
                [target.name]: target.value,
            }
            // () => {
            //     console.log("registration StateUpdate in Login", this.state);
            // }
        );
    }
    //handleLogin
    handleLogin(e) {
        e.preventDefault();
        console.log("clicked on the button login");
        console.log("this.state in Login", this.state);
        fetch("/login.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((resp) => {
                console.log("POST login", resp);
                if (resp.login === true) {
                    return location.redirect("/");
                } else if (resp.login === false) {
                    this.setState({ error: true });
                    console.log("else in handleLogin");
                }
            })
            .catch((err) => {
                console.log("err in POST /login.json", err);
            });
    }
    render() {
        return (
            <section id="login">
                <form>
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
                    <button onClick={this.handleLogin}>Login</button>
                </form>
                {this.state.error && (
                    <h2 className="h2InError">{this.setState.error}</h2>
                )}

                <Link to="/ressetPassword">
                    <button>Resset password</button>
                </Link>
            </section>
        );
    }
}
