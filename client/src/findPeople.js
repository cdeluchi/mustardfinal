import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

export default function findPeople(props) {
    // const [users, setUsers] = useState(["Alistair"]);
    // const [searchTerm, setSearchTerm] = useState("");
    // const [countries, setCountries] = useState();
    const [search, setSearch] = useState("");
    const [users, setusers] = useState([]);

    useEffect(() => {
        console.log("search", search);
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
        return () => {
            console.log("return in useEffect");
        };
    }, [search]);

    useEffect(() => {
        console.log("props.first", props.first);
        return () => {
            console.log(`component is unmounting`);
        };
    }, []);

    // const updatefindPeople = (e) => {
    //     if (e.key === "Enter") {
    //         setPeople([...people, e.target.value]);
    //         e.target.value = "";
    //     }
    // };

    // render(){
    return (
        <>
            <div className="findPeopleContainer">
                <h1> Find People {props.first} </h1>
                <input
                    className="findPeopleInput"
                    type="text"
                    name="name"
                    // onKeyDown={updatefindPeople}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {/* <Link to={`people/${people.id}`}>find People</Link> */}
                {/* {users?.map((users) => (
                    <p key={users}>{users}</p>
                ))} */}
            </div>
        </>
    );
}
//}
