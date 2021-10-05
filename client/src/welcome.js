import { Registration } from "./registration.js";

export default function Welcome() {
    return (
        <>
            <div className="bodyInWelcome">
                <h1>Welcome to this social network without name</h1>
                <img src="/socialNW.png" alt="img" />
                <Registration />
            </div>
        </>
    );
}
