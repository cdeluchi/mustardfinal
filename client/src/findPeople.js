import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function findPeople(props) {
    // const [users, setUsers] = useState(["Alistair"]);
    // const [searchTerm, setSearchTerm] = useState("");
    // const [countries, setCountries] = useState();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        // console.log("props use Effect", props);
        // console.log("search use Effect", search);

        if (search.length > 0) {
            console.log("matching", search);
            console.log("users", users);

            fetch(`/matchingPeople/${search}`)
                .then((res) => res.json())
                .then(({ rows }) => {
                    console.log("rows in matchingpeople", rows);
                    // let findAllUsers = rows.first;
                    setUsers(rows);
                })
                .catch(console.log);
        } else {
            // console.log("latest 3 users", search);
            fetch(`/findPeople/${users}`)
                .then((res) => res.json())
                .then(({ rows }) => {
                    // console.log("rows in else", rows);
                    setUsers(rows);
                })
                .catch(console.log);
        }

        return () => {
            // console.log(`return in useEffect ${search}`);
        };
    }, [search]);
    // render(){
    return (
        <>
            {/* <div className="findPeopleContainer">
                <p> Find People </p>
                <input
                    className="findPeopleInput"
                    type="text"
                    placeholder="search here"
                    // onKeyDown={updatefindPeople}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div> */}
            <div className="showFindPeople">
                {users &&
                    users.map((findAllUsers, i) => (
                        <div key={i}>
                            <Link to={`/users/${findAllUsers.id}`} key={i}>
                                <img
                                    className="profilePicFindPeople"
                                    src={findAllUsers.imgurl}
                                ></img>
                                {/* <p className="pInShowFindPeople">
                                    {findAllUsers.first} {findAllUsers.last}
                                </p> */}
                            </Link>
                        </div>
                    ))}
            </div>
        </>
    );
}
