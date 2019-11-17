import React from "react";
import {connect} from "react-redux";

function StudentCourseSettingsForm(props){
    return(
        <div>
            StudentCourseSettingsForm
        </div>
    )
}

function mapStateToProps(state){
    return{
        courses: state.courses
    }
}

export default connect(mapStateToProps)(StudentCourseSettingsForm);