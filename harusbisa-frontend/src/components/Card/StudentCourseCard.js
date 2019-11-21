import React from "react";
import { Card, CardContent, CardActions, CardHeader} from "@material-ui/core";
import {connect} from "react-redux";
import "../../css/card.css";
import MenuOptions from "../MenuOptions/MenuOptions";

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
                        <MenuOptions/>
                    }
                    title={<h5><a href={"/student/dashboard/"+props.course._id}>{props.course.course_name}</a></h5>}
                />
                <CardContent className="d-none d-md-block" style={{padding:'0px 16px 16px'}}>
                    <p>{props.course.start_term} - {props.course.end_term}</p>
                    <p>{props.course.instructor}</p>
                </CardContent>
                <CardActions className="footer">
                    <p>{props.course.number_of_lectures} Sesi</p>
                </CardActions>
            </Card>
        </div>
    )
}

export default connect(mapStateToProps)(StudentCourseCard);