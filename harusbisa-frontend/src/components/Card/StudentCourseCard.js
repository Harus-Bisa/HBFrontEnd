import React from "react";
import { Card, CardContent, CardActions, CardHeader} from "@material-ui/core";
import {connect} from "react-redux";
import "../../css/card.css";
import MenuOptions from "../MenuOptions/MenuOptions";

function mapStateToProps(state, currentProps){
    var courseId = currentProps.id 
    var courses = state.courses
    for (var i=0; i<courses.length; i++){
        if (courses[i].courseId === courseId){
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
                        <MenuOptions/>
                    }
                    title={<h5><a href={"/student/dashboard/"+props.course.courseId}>{props.course.courseName}</a></h5>}
                />
                <CardContent className="d-none d-md-block" style={{padding:'0px 16px 16px'}}>
                    <p>{props.course.startTerm} - {props.course.endTerm}</p>
                    <p>{props.course.instructors[0]}</p>
                </CardContent>
                <CardActions className="footer">
                    <p>{props.course.numberOfLectures} Sesi</p>
                </CardActions>
            </Card>
        </div>
    )
}

export default connect(mapStateToProps)(StudentCourseCard);