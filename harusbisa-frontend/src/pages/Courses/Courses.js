import React, { useEffect } from "react";
import { withAuth } from "../withAuth";
import services from "../../Services";
import {connect} from "react-redux";
import { getCourses } from "../../redux/actions";

function mapStateToProps(state){
    if (state){
        return{
            data: state.data,
            loading: false
        };
    }
    return{
        loading: true
    }
    
}

function Courses(props){
    const logout = () =>{
        services.logout();
        props.history.push("/")
    }
    useEffect(() => {
        props.getCourses();
    })
    if (props.loading){
        return(<p>Loading</p>)
    }
    return(
        <div>
            Courses
            <p>{props.data.email}</p>
            <button onClick={logout}>logout</button>
        </div>
    )
}


export default connect(mapStateToProps, {getCourses})(withAuth(Courses));