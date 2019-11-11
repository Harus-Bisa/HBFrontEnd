import React from "react";
import { Card, CardContent, CardActions, Button } from "@material-ui/core";
import {connect} from "react-redux";
import {deleteCourse} from "../../redux/actions";


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
    const deleteCourse = () =>{
        props.deleteCourse(props.course._id)   
    }
    return(
        <div className="col-md-6">
            <Card>
                <CardContent>
                    <h4><a href={"/student/dashboard/"+props.course._id}>{props.course.course_name}</a></h4>
                    <p>{props.course.course_name}</p>
                    <p>{props.course.start_term} - {props.course.end_term}</p>
                </CardContent>
                <CardActions>
                    <Button onClick={deleteCourse}>Delete</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default connect(mapStateToProps, {deleteCourse})(StudentCourseCard);