import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

export default function Events({ handlerOpen, handlerClose }) {
    console.log("default Function in Events");
    const [event, setEvent] = useState([]);
    const [search, setSearch] = useState("");
    console.log("props in function", event);
    useEffect(() => {
        fetch(`/findEvents/${event}`)
            .then((res) => res.json())
            .then(({ rows }) => {
                console.log("rows in find events", rows);
                setEvent(rows);
            })
            .catch(console.log);

        return () => {
            console.log(` ${search}`);
        };
    }, [search]);

    return (
        <>
            <div className="findEventsContainer">
                <div>
                    <p>next Events:</p>
                    {event &&
                        event.map((rows, i) => (
                            <div key={i}>
                                <button
                                    className="btnEvents"
                                    to={`/event/${rows.id}`}
                                    onClick={handlerOpen}
                                    // onClick={handlerClose}
                                    key={i}
                                >
                                    <a className="linkEvents">
                                        {rows.events} -{" "}
                                    </a>
                                    <br />
                                    <br />
                                    <a className="linkEvents">{rows.place}</a>
                                    <br />
                                    <br />
                                </button>
                                
                            </div>
                        ))}
                    {/* <button
                        className="btn-handler-close"
                        onClick={handlerClose}
                    >
                        X
                    </button> */}
                </div>
            </div>
        </>
    );
}
//fixed the style and take create the modal at every event
