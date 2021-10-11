import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

export default function findPeople({
    useState()
    useEffect()
    render(){

        return (
            
        <BrowserRouter>
        <Route exact path="/" component={Profile} />
        <Route path="/find-people" component={FindPeople} />
    </BrowserRouter>
        )
    }
})