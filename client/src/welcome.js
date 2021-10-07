import { Component } from "react";
import { Registration } from "./registration.js";
import { Login } from "./login.js";
import { BrowserRouter, Route } from "react-router-dom";

export class Welcome extends Component {
    render() {
        return (
            <BrowserRouter>
                <section id="welcome">
                    <div className="bodyInWelcome">
                        <h1>WHITE FLOCKE ❄️ </h1>
                    </div>
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </section>
            </BrowserRouter>
        );
    }
}
