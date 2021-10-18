// import ReactDOM from "react-dom";
// import { Welcome } from "./welcome.js";
// import App from "./app.js";

// // import { Component } from "react";

// fetch("/user/id.json")
//     .then((response) => response.json())
//     .then((data) => {
//         if (!data.userId) {
//             ReactDOM.render(<Welcome />, document.querySelector("main"));
//         } else {
//             ReactDOM.render(<App />, document.querySelector("main"));
//         }
//     });

// ***** SOMETHING WENT WRONG ****

import ReactDOM from "react-dom";
import { Welcome } from "./welcome";
import App from "./app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./redux/reducer.js";
import { io } from "socket.io-client";

io.connect();

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

const elem = (
    <Provider store={store}>
        <App />
    </Provider>
);

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        // console.log("client: id?", data);
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(elem, document.querySelector("main"));
        }
    });
