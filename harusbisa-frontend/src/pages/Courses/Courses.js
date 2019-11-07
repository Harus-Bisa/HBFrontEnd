import React from "react";
import { withAuth } from "../withAuth";
import services from "../../Services";

function Courses(props){
    const logout = () =>{
        services.logout();
        props.history.push("/")
    }
    return(
        <div>
            Courses
            <button onClick={logout}>logout</button>
        </div>
    )
}

export default withAuth(Courses);