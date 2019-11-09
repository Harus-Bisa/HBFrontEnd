import React from "react";
import { Card, CardContent } from "@material-ui/core";
import {connect} from "react-redux";

function FunctionalCard(props){
    return(
        <Card>
            <CardContent style={props.styles.content}>
                <h3><a href={props.content.link}>{props.content.title}</a></h3>
            </CardContent>
        </Card>
    )
}
function mapStateToProps(state, currentProps){
    var courseId = currentProps.id 
    var courses = state.courses
    for (var i=0; i<courses.length; i++){
        if (courses[i]._id === courseId){
            return {
                course: courses[i]
            }
        }
    }
    return null
}
function ProfCourseCard(props){
    const styles={
        content: {background:"pink"}
    }

    const content = {
        title: props.course.course_name,
        link: "/dashboard/"+props.course._id
    }
    return(<FunctionalCard content={content} styles={styles}/>)
}

export default connect(mapStateToProps)(ProfCourseCard);