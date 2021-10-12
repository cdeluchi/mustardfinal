import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

export default function findPeople(props) {
    // const [users, setUsers] = useState(["Alistair"]);
    // const [searchTerm, setSearchTerm] = useState("");
    // const [countries, setCountries] = useState();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        console.log("props use Effect", props);
        console.log("search use Effect", search);

        if (search.length > 0) {
            console.log("matching", search);
            console.log("users", users);

            fetch(`/matchingPeople/${search}`)
                .then((res) => res.json())
                .then(({ rows }) => {
                    console.log("rows in matchingpeople", rows);
                    let finduser = rows[0].first;
                    setUsers(rows);
                })
                .catch(console.log);
        } else {
            console.log("latest 3 users", search);
            fetch(`/findPeople/${users}`)
                .then((res) => res.json())
                .then(({ rows }) => {
                    console.log("rows in else", rows);
                    setUsers(rows);
                })
                .catch(console.log);
        }
        //if search length > 0
        //then we want to make a fetch to db
        // and communicate with server
        //if the search length is = 0
        // we want to fetch (diff) the db
        //serve give the recente users...
        //
        // fetch(`)
        //     .then((res) => res.json())
        //     .then((results) => {
        //         console.log("results: ", results);
        //         setusers(results);
        //     })
        // .catch(console.log);

        // const updatefindPeople = (e) => {
        //     if (e.key === "Enter") {
        //         setPeople([...people, e.target.value]);
        //         e.target.value = "";
        //     }
        // };

        return () => {
            console.log(`return in useEffect ${search}`);
        };
    }, [search]);
    // render(){
    return (
        <>
            <div className="findPeopleContainer">
                <h1> Find People </h1>
                <input
                    className="findPeopleInput"
                    type="text"
                    placeholder="search here"
                    // onKeyDown={updatefindPeople}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            {users &&
                users.map((newusers, i) => (
                    <div key={i}>
                        <img
                            className="findprofile"
                            src={newusers.imgurl}
                        ></img>
                        <h3>
                            {newusers.first} {newusers.last}
                        </h3>
                    </div>
                ))}
        </>
    );
}

{
    /* {users &&
    users.map((user, i) => (
        <Link to={`users/${users.id}`} key={i}>
            <p>{users.first}</p>
            <img src={users.imgurl} />
        </Link>
    ))} */
}
