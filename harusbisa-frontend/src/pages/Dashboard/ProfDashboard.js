import React, { useEffect } from "react";
import { withAuth } from "../withAuth";
import {getLectures} from "../../redux/actions";
import {connect} from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";

function mapStateToProps(state){
    return{
        loading: state.loading,
        course: state.course
    }
    
}
function ProfDashboard(props){
    const courseId = props.match.params.id
    useEffect(() =>{
        props.getLectures(courseId);
    })
    if (props.loading){
        return(<p>Loading</p>)
    }

    return(
        <div>
            <header>
                <h1>Dashboard</h1>
                <p>{props.course.course_name}</p>
            </header>
            <div className="row">
                <div className="col-3">
                    <Sidebar/>
                </div>
                <div className="col">
                    Content
                </div>
            </div>
            
            
        </div>
    )
}

export default  connect(mapStateToProps, {getLectures})(withAuth(ProfDashboard));