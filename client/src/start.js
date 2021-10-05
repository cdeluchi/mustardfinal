import ReactDOM from "react-dom";
import Welcome from "./welcome.js";

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(
                <img className="logo" src="/kazamiga-rb.png" alt="logo" />,
                document.querySelector("main")
            );
        }
    });
