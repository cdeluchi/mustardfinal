import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Events(props) {
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
                                <Link to={`/event/${rows.id}`} key={i}>
                                    <span className="linkEvents">
                                        {rows.events}
                                    </span>
                                    <span className="linkPlace">
                                        {rows.place}
                                    </span>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
