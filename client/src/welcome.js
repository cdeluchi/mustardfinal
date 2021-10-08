import { Component } from "react";
import { Registration } from "./registration.js";
import { Login } from "./login.js";
import Reset from "./resetPassword";
import { BrowserRouter, Route } from "react-router-dom";

export class Welcome extends Component {
    render() {
        return (
            <BrowserRouter>
                <img src="socialNW.png" alt="logo" />
                <section id="welcome">
                    <div className="bodyInWelcome">
                        <h1>SOCIAL NETWORK </h1>
                    </div>
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/resetPassword">
                        <Reset />
                    </Route>
                </section>
            </BrowserRouter>
        );
    }
}
