import { useEffect, useState } from "react";

export default function otherProfile() {
    const [user, setUser] = useState({});
    useEffect(() => {
        return () => {
            console.log("cleanup function running ");
        };
    }, []);
    return <h1>I am another User</h1>;
}

//atob decriptura o cookie
