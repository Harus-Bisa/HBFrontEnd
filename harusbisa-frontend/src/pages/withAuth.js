import services from "../Services";
import React from "react";

export function withAuth(Page){
    return (props) => {
        if (services.isLoggedIn()){
            return <Page {...props}/>;
        }
        else{
            alert("Unauthorized. You are not logged in.")
            props.history.push("/")
            return null;
        }
    }
    
}