import React, { useEffect } from "react";
import { withAuth } from "../withAuth";
import {getLectures} from "../../redux/actions";
import {connect} from "react-redux";
import store from "../../redux/store";

function mapStateToProps(state){
    if (state){
        return{
            // courses: state.courses,
            loading: false
        };
    }
    return{
        loading: true
    }
    
}
function ProfDashboard(props){
    const courseId = props.match.params.id
    useEffect(() =>{
        props.getLectures(courseId);
    })
    console.log(store.getState())
    return(
        <div>
            <h1>Dashboard</h1>
            <p>{courseId}</p>
        </div>
    )
}

export default  connect(mapStateToProps, {getLectures})(withAuth(ProfDashboard));