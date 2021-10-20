import { Component } from "react";
// import { Link } from "react-router-dom";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "try again!",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    componentDidMount() {
        this.setState({
            error: false,
        });
    }
    handleChange({ target }) {
        this.setState(
            {
                [target.name]: target.value,
            },
            () => {}
        );
    }
    async handleLogin(e) {
        e.preventDefault();
        const result = await fetch("/login", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json",
            },
        }).catch((err) => console.log(err));
        const data = await result.json();

        if (!data.success) {
            this.setState({
                error: "Try again.",
            });
        } else {
            location.replace("/");
        }
    }
    render() {
        return (
            <section id="login">
                <form className="login-registration">
                    <input
                        type="email"
                        name="email"
                        placeholder="@email"
                        onChange={this.handleChange}
                        required
                    ></input>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={this.handleChange}
                        required
                    ></input>
                    <button onClick={this.handleLogin}>Login</button>
                </form>
                <div>
                    {this.state.error && (
                        <h2 className="h2InError">{this.state.error}</h2>
                    )}
                </div>
            </section>
        );
    }
}
