import React from "react";
import { Card, CardContent, CardActions, CardHeader, IconButton } from "@material-ui/core";
import {connect} from "react-redux";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import "../../css/card.css";

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
function StudentCourseCard(props){
    return(
        <div className="col-md-6">
            <Card className="card student-card">
                <CardHeader
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title={<h5><a href={"/student/dashboard/"+props.course._id}>{props.course.course_name}</a></h5>}
                />
                <CardContent className="d-none d-md-block">
                    <p>{props.course.start_term} - {props.course.end_term}</p>
                    <p>{props.course.instructor}</p>
                </CardContent>
                <CardActions className="action">
                    <p>{props.course.number_of_lectures} Sesi</p>
                </CardActions>
            </Card>
        </div>
    )
}

export default connect(mapStateToProps)(StudentCourseCard);